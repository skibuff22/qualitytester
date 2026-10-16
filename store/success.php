<?php
/** Post-checkout page: verifies the session with Stripe server-side and shows the download. */

declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');

require_once __DIR__ . '/lib.php';

$sid = (string)($_GET['session_id'] ?? '');
if ($sid === '' || !preg_match('/^cs_[A-Za-z0-9_]+$/', $sid)) {
    store_html_page('Invalid link', '<h1>Invalid link</h1><p>Missing checkout session.</p>', 400);
}

try {
    $session = stripe_request('GET', '/v1/checkout/sessions/' . rawurlencode($sid));
} catch (Throwable $e) {
    error_log('[store] success lookup failed: ' . $e->getMessage());
    store_html_page('Please wait', '<h1>We could not verify the payment yet</h1><p>Refresh this page in a moment. Your download link is also being emailed to you.</p>', 502);
}

if (($session['payment_status'] ?? '') !== 'paid') {
    store_html_page('Payment pending', '<h1>Payment pending</h1><p>Once the payment clears, refresh this page or use the link in your email.</p>');
}

$pdo = store_pdo();
$order = store_record_order($pdo, $session, 'success');
if ($order && empty($order['email_sent_at'])) {
    store_send_delivery_email($pdo, $order);
}
$product = catalog_get((string)$order['sku']);
$url = store_download_url($sid, (string)$order['sku']);
$name = htmlspecialchars($product['name'] ?? 'your product', ENT_QUOTES);
$email = htmlspecialchars((string)($order['email'] ?? ''), ENT_QUOTES);

store_html_page('Thank you', "<h1>Thank you — your purchase is complete</h1>"
    . "<p><strong>{$name}</strong></p>"
    . "<a class=\"btn\" href=\"" . htmlspecialchars($url, ENT_QUOTES) . "\">Download now</a>"
    . "<p><small>The same link was emailed to {$email}. It stays valid for 30 days. Unzip and open <code>START-HERE.md</code>.</small></p>"
    . "<p><small>Questions or a refund within 14 days: reply to the email or write to " . htmlspecialchars(store_config()['reply_to'], ENT_QUOTES) . ".</small></p>");
