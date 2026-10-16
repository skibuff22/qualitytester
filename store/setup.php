<?php
/**
 * One-time store configuration (mirrors install.php). First POST creates
 * qt_private/store.php and returns a generated admin key exactly once. Later POSTs must
 * carry that admin key (X-Admin-Key header) and may update individual fields — used to
 * add the webhook signing secret after the endpoint is registered with Stripe.
 *
 *   curl -X POST https://api.qualitytester.us/store/setup.php -d stripe_secret=sk_live_...
 *   curl -X POST ... -H "X-Admin-Key: <key>" -d webhook_secret=whsec_...
 */

declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');

require_once dirname(__DIR__) . '/lib/config.php';

header('Content-Type: application/json');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo '{"error":"POST only"}';
    exit;
}

$privateDir = qt_private_dir();
$path = $privateDir . '/store.php';
$exists = is_file($path);
$current = $exists ? (require $path) : [];

if ($exists) {
    $given = $_SERVER['HTTP_X_ADMIN_KEY'] ?? '';
    if ($given === '' || !hash_equals((string)$current['admin_key'], $given)) {
        http_response_code(403);
        echo '{"error":"admin key required"}';
        exit;
    }
}

$allowed = ['stripe_secret', 'webhook_secret', 'from_email', 'reply_to', 'storefront_url', 'base_url'];
$new = $current;
foreach ($allowed as $k) {
    if (isset($_POST[$k]) && $_POST[$k] !== '') {
        $new[$k] = trim((string)$_POST[$k]);
    }
}
if (empty($new['stripe_secret']) || strpos($new['stripe_secret'], 'sk_') !== 0) {
    http_response_code(400);
    echo '{"error":"stripe_secret (sk_...) required"}';
    exit;
}
$generated = null;
if (empty($new['admin_key'])) {
    $generated = 'sadm_' . bin2hex(random_bytes(24));
    $new['admin_key'] = $generated;
}

if (!is_dir($privateDir)) {
    mkdir($privateDir, 0700, true);
}
$src = "<?php\nreturn " . var_export($new, true) . ";\n";
if (file_put_contents($path, $src, LOCK_EX) === false) {
    http_response_code(500);
    echo '{"error":"could not write config"}';
    exit;
}
@chmod($path, 0600);

$out = ['ok' => true, 'configured' => array_keys(array_filter($new, fn($v) => $v !== '')), 'created' => !$exists];
if ($generated !== null) {
    $out['admin_key'] = $generated; // shown once
}
echo json_encode($out, JSON_UNESCAPED_SLASHES);
