<?php
/**
 * First-party traffic beacon (E5). Pages call
 *   hit.php?p=<path>&q=<location.search>&r=<document.referrer>
 * Stores path, referrer host and utm_* only - no IP, no user agent, no cookies.
 * Always answers with a 1x1 GIF so a failure never shows on the page.
 */

declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');

require_once __DIR__ . '/lib.php';

header('Content-Type: image/gif');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');

try {
    if (!store_is_bot((string)($_SERVER['HTTP_USER_AGENT'] ?? ''))) {
        $f = store_hit_fields('view', (string)($_GET['p'] ?? '/'), (string)($_GET['q'] ?? ''), (string)($_GET['r'] ?? ''));
        store_record_hit(store_pdo(), $f);
    }
} catch (Throwable $e) {
    error_log('[store] hit failed: ' . $e->getMessage());
}
echo base64_decode('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
