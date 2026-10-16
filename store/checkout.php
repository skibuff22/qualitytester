<?php
/** Creates a Stripe Checkout Session for one SKU and redirects the buyer to Stripe. */

declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');

require_once __DIR__ . '/lib.php';

header('X-Frame-Options: DENY');
header('Cache-Control: no-store');

$sku = (string)($_GET['sku'] ?? '');
$product = catalog_get($sku);
if ($product === null) {
    store_html_page('Unknown product', '<h1>Unknown product</h1><p>That SKU does not exist.</p>', 404);
}

$cfg = store_config();
$successUrl = $cfg['base_url'] . '/success.php?session_id={CHECKOUT_SESSION_ID}';
$cancelUrl  = $cfg['storefront_url'];

try {
    $session = stripe_request('POST', '/v1/checkout/sessions', [
        'mode'                                   => 'payment',
        'success_url'                            => $successUrl,
        'cancel_url'                             => $cancelUrl,
        'allow_promotion_codes'                  => 'true',
        'billing_address_collection'             => 'auto',
        'line_items[0][quantity]'                => 1,
        'line_items[0][price_data][currency]'    => $product['currency'],
        'line_items[0][price_data][unit_amount]' => $product['price_cents'],
        'line_items[0][price_data][product_data][name]'        => $product['name'],
        'line_items[0][price_data][product_data][description]' => $product['description'],
        'metadata[sku]'                          => $sku,
        'payment_intent_data[description]'       => $product['name'] . ' (' . $sku . ')',
        'payment_intent_data[metadata][sku]'     => $sku,
        'invoice_creation[enabled]'              => 'true',
    ]);
} catch (Throwable $e) {
    error_log('[store] checkout failed: ' . $e->getMessage());
    store_html_page('Checkout unavailable', '<h1>Checkout temporarily unavailable</h1><p>Please try again in a minute.</p>', 502);
}

header('Location: ' . $session['url'], true, 303);
exit;
