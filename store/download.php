<?php
/** Streams a purchased file for a valid signed token. */

declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');

require_once __DIR__ . '/lib.php';

$tok = (string)($_GET['t'] ?? '');
$claims = store_parse_token($tok);
if ($claims === null) {
    store_html_page('Link expired', '<h1>This download link is invalid or has expired</h1><p>Links are valid for 30 days. Reply to your receipt email and we will send a fresh one.</p>', 403);
}

$pdo = store_pdo();
$order = store_find_order($pdo, $claims['s']);
if ($order === null || $order['status'] !== 'paid' || $order['sku'] !== $claims['k']) {
    store_html_page('Not found', '<h1>Order not found</h1><p>We could not match this link to a paid order.</p>', 404);
}
$product = catalog_get($claims['k']);
$path = __DIR__ . '/files/' . ($product['file'] ?? '');
if ($product === null || !is_file($path)) {
    error_log('[store] missing file for sku ' . $claims['k']);
    store_html_page('File unavailable', '<h1>File temporarily unavailable</h1><p>We have been notified. Please try again shortly.</p>', 503);
}
if ((int)$order['downloads'] >= (int)($product['max_downloads'] ?? 20)) {
    store_html_page('Limit reached', '<h1>Download limit reached</h1><p>Reply to your receipt email and we will reset it.</p>', 429);
}

$st = $pdo->prepare('UPDATE qt_store_orders SET downloads = downloads + 1, updated_at=? WHERE session_id=?');
$st->execute([store_now(), $claims['s']]);

header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="' . ($product['download_name'] ?? basename($path)) . '"');
header('Content-Length: ' . (string)filesize($path));
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
readfile($path);
exit;
