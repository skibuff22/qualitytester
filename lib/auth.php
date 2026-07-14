<?php
/**
 * Authentication + rate limiting.
 *
 * Two tiers:
 *  1) Vendor key (X-API-Key) - used by the force-test.com landing page for the public,
 *     read-mostly endpoints. It is an identification/abuse-control key, not a secret
 *     capable of reaching any internal system.
 *  2) Sync HMAC - used ONLY by the Mac Mini. Request signature:
 *         canonical = METHOD \n PATH \n QUERY \n TIMESTAMP \n NONCE \n sha256hex(body)
 *         signature = hex( HMAC-SHA256( canonical, sync_secret ) )
 *     Headers: X-Sync-Key-Id, X-Sync-Timestamp (unix seconds), X-Sync-Nonce (random hex,
 *     unique per request), X-Sync-Signature.
 *     Timestamps outside +/-300s are rejected; each nonce is single-use (replay guard).
 *
 * The server holds no credentials for, and no route to, the Mac Mini. All connectivity is
 * one-way: the Mac initiates HTTPS requests to this API. Nothing here can "call back".
 */

require_once __DIR__ . '/respond.php';

function qt_require_vendor_key(array $cfg): void {
    $key = $_SERVER['HTTP_X_API_KEY'] ?? '';
    if ($key === '' || !hash_equals($cfg['vendor_api_key'], $key)) {
        qt_error('Missing or invalid API key', 401);
    }
}

function qt_canonical_string(string $method, string $path, string $query, string $ts, string $nonce, string $bodySha256Hex): string {
    return strtoupper($method) . "\n" . $path . "\n" . $query . "\n" . $ts . "\n" . $nonce . "\n" . $bodySha256Hex;
}

function qt_require_sync_auth(array $cfg, PDO $pdo, string $rawBody): void {
    $keyId = $_SERVER['HTTP_X_SYNC_KEY_ID'] ?? '';
    $ts    = $_SERVER['HTTP_X_SYNC_TIMESTAMP'] ?? '';
    $nonce = strtolower($_SERVER['HTTP_X_SYNC_NONCE'] ?? '');
    $sig   = strtolower($_SERVER['HTTP_X_SYNC_SIGNATURE'] ?? '');
    if ($keyId === '' || $ts === '' || $sig === '' || !preg_match('/^[a-f0-9]{16,64}$/', $nonce)) {
        qt_error('Missing sync auth headers', 401);
    }
    if (!hash_equals($cfg['sync_key_id'], $keyId)) {
        qt_error('Unknown sync key id', 401);
    }
    if (!ctype_digit($ts) || abs(time() - (int)$ts) > 300) {
        qt_error('Timestamp outside allowed window', 401);
    }
    $uri = $_SERVER['REQUEST_URI'] ?? '';
    $qpos = strpos($uri, '?');
    $path = $qpos === false ? $uri : substr($uri, 0, $qpos);
    $query = $qpos === false ? '' : substr($uri, $qpos + 1);
    $canonical = qt_canonical_string($_SERVER['REQUEST_METHOD'] ?? 'GET', $path, $query, $ts, $nonce, hash('sha256', $rawBody));
    $expected = hash_hmac('sha256', $canonical, $cfg['sync_secret']);
    if (!hash_equals($expected, $sig)) {
        qt_error('Bad signature', 401);
    }
    // Replay guard: a nonce may be used exactly once (window matches the timestamp check).
    $pdo->exec('DELETE FROM qt_nonces WHERE seen_at < ' . (time() - 900));
    $st = $pdo->prepare('SELECT 1 FROM qt_nonces WHERE sig = ?');
    $st->execute([$nonce]);
    if ($st->fetch()) {
        qt_error('Replay detected', 401);
    }
    $pdo->prepare('INSERT INTO qt_nonces (sig, seen_at) VALUES (?, ?)')->execute([$nonce, time()]);
}

/**
 * Fixed-window rate limiter backed by the database.
 * Returns silently when under the limit, emits 429 otherwise.
 */
function qt_rate_limit(PDO $pdo, string $bucket, int $limit, int $windowSec): void {
    $now = time();
    $windowStart = $now - ($now % $windowSec);
    $pdo->beginTransaction();
    try {
        $st = $pdo->prepare('SELECT window_start, cnt FROM qt_ratelimit WHERE bucket = ?');
        $st->execute([$bucket]);
        $row = $st->fetch();
        if ($row === false) {
            $pdo->prepare('INSERT INTO qt_ratelimit (bucket, window_start, cnt) VALUES (?, ?, 1)')
                ->execute([$bucket, $windowStart]);
            $count = 1;
        } elseif ((int)$row['window_start'] !== $windowStart) {
            $pdo->prepare('UPDATE qt_ratelimit SET window_start = ?, cnt = 1 WHERE bucket = ?')
                ->execute([$windowStart, $bucket]);
            $count = 1;
        } else {
            $count = (int)$row['cnt'] + 1;
            $pdo->prepare('UPDATE qt_ratelimit SET cnt = ? WHERE bucket = ?')
                ->execute([$count, $bucket]);
        }
        $pdo->commit();
    } catch (Throwable $e) {
        $pdo->rollBack();
        return; // rate limiting must never take the API down
    }
    if ($count > $limit) {
        header('Retry-After: ' . $windowSec);
        qt_error('Rate limit exceeded', 429);
    }
}
