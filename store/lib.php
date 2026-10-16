<?php
/**
 * Calyx AI digital store — shared library.
 *
 * Runs on api.qualitytester.us next to the tester API and reuses its private config
 * (<domain-root>/qt_private/). Store secrets live in qt_private/store.php, written once by
 * store/setup.php. Nothing secret is ever in git.
 *
 * Flow:  storefront "Buy" -> checkout.php?sku=X  -> Stripe Checkout (hosted)
 *        -> webhook.php (checkout.session.completed) records order + emails download link
 *        -> success.php?session_id=... verifies with Stripe and shows the link immediately
 *        -> download.php?t=<signed token> streams the file from store/files/ (web-denied dir)
 */

declare(strict_types=1);

require_once dirname(__DIR__) . '/lib/config.php';
require_once __DIR__ . '/catalog.php';

const STORE_SCHEMA_VERSION = 1;

function store_private_path(): string {
    return qt_private_dir() . '/store.php';
}

/** @return array{stripe_secret:string, webhook_secret:string, admin_key:string, from_email:string, reply_to:string, storefront_url:string, base_url:string} */
function store_config(): array {
    static $cfg = null;
    if ($cfg !== null) {
        return $cfg;
    }
    $path = store_private_path();
    if (!is_file($path)) {
        http_response_code(503);
        header('Content-Type: text/plain');
        echo 'Store not configured. Run store/setup.php once.';
        exit;
    }
    $cfg = require $path;
    $cfg += [
        'webhook_secret' => '',
        'from_email'     => 'noreply@qualitytester.us',
        'reply_to'       => 'tdoane@calyx-ai.net',
        'storefront_url' => 'https://calyx-ai.net/',
        'base_url'       => 'https://api.qualitytester.us/store',
    ];
    return $cfg;
}

function store_pdo(): PDO {
    $pdo = qt_pdo(qt_config());
    store_migrate($pdo);
    return $pdo;
}

function store_migrate(PDO $pdo): void {
    static $done = false;
    if ($done) {
        return;
    }
    $done = true;
    $driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);
    $ai = $driver === 'mysql' ? 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
    $pdo->exec("CREATE TABLE IF NOT EXISTS qt_store_orders (
        id $ai,
        session_id VARCHAR(255) NOT NULL,
        payment_intent VARCHAR(255) NULL,
        sku VARCHAR(64) NOT NULL,
        email VARCHAR(320) NULL,
        amount_cents INT NOT NULL DEFAULT 0,
        currency VARCHAR(8) NOT NULL DEFAULT 'usd',
        status VARCHAR(32) NOT NULL,
        source VARCHAR(16) NOT NULL,
        email_sent_at VARCHAR(32) NULL,
        downloads INT NOT NULL DEFAULT 0,
        created_at VARCHAR(32) NOT NULL,
        updated_at VARCHAR(32) NOT NULL
    )");
    try {
        $pdo->exec('CREATE UNIQUE INDEX ux_store_session ON qt_store_orders (session_id)');
    } catch (Throwable $e) {
        // exists
    }
    $pdo->exec("CREATE TABLE IF NOT EXISTS qt_store_events (
        id $ai,
        event_id VARCHAR(255) NOT NULL,
        type VARCHAR(128) NOT NULL,
        received_at VARCHAR(32) NOT NULL
    )");
    try {
        $pdo->exec('CREATE UNIQUE INDEX ux_store_event ON qt_store_events (event_id)');
    } catch (Throwable $e) {
        // exists
    }
}

function store_now(): string {
    return gmdate('Y-m-d\TH:i:s\Z');
}

// ------------------------------------------------------------------ Stripe HTTP

/**
 * Minimal Stripe REST client (no SDK on shared hosting). $params is a flat
 * form-encoded array (use bracket keys for nesting, e.g. 'line_items[0][quantity]').
 * @return array decoded JSON; throws RuntimeException on transport/API error.
 */
function stripe_request(string $method, string $path, array $params = [], ?string $idempotencyKey = null): array {
    $cfg = store_config();
    $ch = curl_init('https://api.stripe.com' . $path);
    $headers = ['Authorization: Bearer ' . $cfg['stripe_secret'], 'Stripe-Version: 2024-06-20'];
    if ($idempotencyKey !== null) {
        $headers[] = 'Idempotency-Key: ' . $idempotencyKey;
    }
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 20,
        CURLOPT_HTTPHEADER     => $headers,
        CURLOPT_CUSTOMREQUEST  => $method,
    ]);
    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    } elseif ($params) {
        curl_setopt($ch, CURLOPT_URL, 'https://api.stripe.com' . $path . '?' . http_build_query($params));
    }
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $err  = curl_error($ch);
    curl_close($ch);
    if ($body === false) {
        throw new RuntimeException('Stripe transport error: ' . $err);
    }
    $json = json_decode((string)$body, true);
    if (!is_array($json)) {
        throw new RuntimeException('Stripe returned non-JSON (' . $code . ')');
    }
    if ($code >= 400) {
        $msg = $json['error']['message'] ?? ('HTTP ' . $code);
        throw new RuntimeException('Stripe error: ' . $msg);
    }
    return $json;
}

/**
 * Verify a Stripe-Signature header against the raw payload (Stripe's documented scheme:
 * HMAC-SHA256 over "<t>.<payload>" with the endpoint secret; tolerance 5 minutes).
 */
function stripe_verify_signature(string $payload, string $header, string $secret, int $tolerance = 300, ?int $now = null): bool {
    if ($secret === '' || $header === '') {
        return false;
    }
    $t = null;
    $sigs = [];
    foreach (explode(',', $header) as $part) {
        $kv = explode('=', trim($part), 2);
        if (count($kv) !== 2) {
            continue;
        }
        if ($kv[0] === 't') {
            $t = (int)$kv[1];
        } elseif ($kv[0] === 'v1') {
            $sigs[] = $kv[1];
        }
    }
    if ($t === null || !$sigs) {
        return false;
    }
    $now = $now ?? time();
    if (abs($now - $t) > $tolerance) {
        return false;
    }
    $expected = hash_hmac('sha256', $t . '.' . $payload, $secret);
    foreach ($sigs as $s) {
        if (hash_equals($expected, $s)) {
            return true;
        }
    }
    return false;
}

// ------------------------------------------------------------------ orders

function store_find_order(PDO $pdo, string $sessionId): ?array {
    $st = $pdo->prepare('SELECT * FROM qt_store_orders WHERE session_id = ?');
    $st->execute([$sessionId]);
    $row = $st->fetch();
    return $row === false ? null : $row;
}

/**
 * Idempotent upsert keyed on the Checkout Session id. Returns the stored order row.
 * $source is 'webhook' or 'success' (whichever arrived first wins the insert).
 */
function store_record_order(PDO $pdo, array $session, string $source): array {
    $sid    = (string)$session['id'];
    $sku    = (string)($session['metadata']['sku'] ?? '');
    $email  = $session['customer_details']['email'] ?? ($session['customer_email'] ?? null);
    $amount = (int)($session['amount_total'] ?? 0);
    $cur    = (string)($session['currency'] ?? 'usd');
    $status = ($session['payment_status'] ?? '') === 'paid' ? 'paid' : (string)($session['payment_status'] ?? 'unknown');
    $pi     = is_string($session['payment_intent'] ?? null) ? $session['payment_intent'] : null;
    $now    = store_now();

    $existing = store_find_order($pdo, $sid);
    if ($existing === null) {
        try {
            $ins = $pdo->prepare('INSERT INTO qt_store_orders
                (session_id, payment_intent, sku, email, amount_cents, currency, status, source, created_at, updated_at)
                VALUES (?,?,?,?,?,?,?,?,?,?)');
            $ins->execute([$sid, $pi, $sku, $email, $amount, $cur, $status, $source, $now, $now]);
        } catch (Throwable $e) {
            // race with the other path; fall through to update
        }
    }
    $upd = $pdo->prepare('UPDATE qt_store_orders SET status=?, email=COALESCE(?, email), payment_intent=COALESCE(?, payment_intent), updated_at=? WHERE session_id=?');
    $upd->execute([$status, $email, $pi, $now, $sid]);
    return store_find_order($pdo, $sid) ?? [];
}

function store_mark_emailed(PDO $pdo, string $sessionId): void {
    $st = $pdo->prepare('UPDATE qt_store_orders SET email_sent_at=? WHERE session_id=? AND email_sent_at IS NULL');
    $st->execute([store_now(), $sessionId]);
}

function store_event_seen(PDO $pdo, string $eventId, string $type): bool {
    try {
        $st = $pdo->prepare('INSERT INTO qt_store_events (event_id, type, received_at) VALUES (?,?,?)');
        $st->execute([$eventId, $type, store_now()]);
        return false;
    } catch (Throwable $e) {
        return true; // duplicate delivery
    }
}

// ------------------------------------------------------------------ download tokens

function store_token_secret(): string {
    return hash('sha256', 'store-download|' . store_config()['admin_key']);
}

/** Signed, expiring download token: base64url(json) . '.' . hmac */
function store_make_token(string $sessionId, string $sku, int $ttlSeconds = 30 * 86400, ?int $now = null, ?string $secret = null): string {
    $now = $now ?? time();
    $payload = json_encode(['s' => $sessionId, 'k' => $sku, 'e' => $now + $ttlSeconds], JSON_UNESCAPED_SLASHES);
    $b = rtrim(strtr(base64_encode($payload), '+/', '-_'), '=');
    $sig = hash_hmac('sha256', $b, $secret ?? store_token_secret());
    return $b . '.' . $sig;
}

/** @return array{s:string,k:string,e:int}|null */
function store_parse_token(string $token, ?int $now = null, ?string $secret = null): ?array {
    $parts = explode('.', $token, 2);
    if (count($parts) !== 2) {
        return null;
    }
    [$b, $sig] = $parts;
    $expected = hash_hmac('sha256', $b, $secret ?? store_token_secret());
    if (!hash_equals($expected, $sig)) {
        return null;
    }
    $json = json_decode(base64_decode(strtr($b, '-_', '+/')) ?: '', true);
    if (!is_array($json) || !isset($json['s'], $json['k'], $json['e'])) {
        return null;
    }
    if ((int)$json['e'] < ($now ?? time())) {
        return null;
    }
    return ['s' => (string)$json['s'], 'k' => (string)$json['k'], 'e' => (int)$json['e']];
}

function store_download_url(string $sessionId, string $sku): string {
    return store_config()['base_url'] . '/download.php?t=' . rawurlencode(store_make_token($sessionId, $sku));
}

// ------------------------------------------------------------------ email

function store_send_delivery_email(PDO $pdo, array $order): bool {
    $email = $order['email'] ?? '';
    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    $product = catalog_get((string)$order['sku']);
    if ($product === null) {
        return false;
    }
    $cfg = store_config();
    $url = store_download_url((string)$order['session_id'], (string)$order['sku']);
    $subject = 'Your download: ' . $product['name'];
    $body = "Thanks for your purchase!\n\n"
        . "Product: {$product['name']}\n"
        . "Download (valid 30 days, up to 20 downloads):\n{$url}\n\n"
        . "Getting started: unzip and open START-HERE.md.\n\n"
        . "Need help or want a refund within 14 days? Reply to this email.\n\n"
        . "— Calyx AI (a product line of Quality Tester Solutions LLC)\n";
    $headers = 'From: Calyx AI Store <' . $cfg['from_email'] . ">\r\n"
        . 'Reply-To: ' . $cfg['reply_to'] . "\r\n"
        . "Content-Type: text/plain; charset=UTF-8\r\n";
    $ok = @mail($email, $subject, $body, $headers);
    if ($ok) {
        store_mark_emailed($pdo, (string)$order['session_id']);
    }
    return $ok;
}

function store_html_page(string $title, string $bodyHtml, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-store');
    $t = htmlspecialchars($title, ENT_QUOTES);
    echo "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
        . "<meta name=\"robots\" content=\"noindex\"><title>{$t}</title>"
        . "<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0f1115;color:#e8e8ea;margin:0;padding:48px 16px}"
        . ".card{max-width:620px;margin:0 auto;background:#171a21;border:1px solid #262a33;border-radius:14px;padding:32px}"
        . "h1{font-size:1.5rem;margin:0 0 12px}p{line-height:1.55;color:#c9ccd3}a.btn{display:inline-block;margin-top:16px;background:#e23d3d;color:#fff;text-decoration:none;padding:12px 20px;border-radius:8px;font-weight:600}"
        . "code{background:#0f1115;padding:2px 6px;border-radius:4px}small{color:#8b8f99}</style></head><body><div class=\"card\">{$bodyHtml}</div></body></html>";
    exit;
}
