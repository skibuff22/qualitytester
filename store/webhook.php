<?php
/** Stripe webhook: records paid Checkout Sessions and emails the download link. */

declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');

require_once __DIR__ . '/lib.php';

header('Cache-Control: no-store');
header('Content-Type: application/json');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo '{"error":"POST only"}';
    exit;
}

$cfg = store_config();
$payload = file_get_contents('php://input') ?: '';
$sig = $_SERVER['HTTP_STRIPE_SIGNATURE'] ?? '';

if (!stripe_verify_signature($payload, $sig, $cfg['webhook_secret'])) {
    http_response_code(400);
    echo '{"error":"bad signature"}';
    exit;
}

$event = json_decode($payload, true);
if (!is_array($event) || !isset($event['id'], $event['type'])) {
    http_response_code(400);
    echo '{"error":"bad payload"}';
    exit;
}

$pdo = store_pdo();
if (store_event_seen($pdo, (string)$event['id'], (string)$event['type'])) {
    echo '{"ok":true,"duplicate":true}';
    exit;
}

if ($event['type'] === 'checkout.session.completed' || $event['type'] === 'checkout.session.async_payment_succeeded') {
    $session = $event['data']['object'] ?? [];
    if (store_is_paid($session)) {
        $order = store_record_order($pdo, $session, 'webhook');
        if ($order && empty($order['email_sent_at'])) {
            store_send_delivery_email($pdo, $order);
        }
    }
}

echo '{"ok":true}';
