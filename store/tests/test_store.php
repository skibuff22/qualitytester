<?php
/** php store/tests/test_store.php — unit tests on SQLite (no network). */

declare(strict_types=1);

$tmp = sys_get_temp_dir() . '/qt_store_test_' . getmypid();
@mkdir($tmp, 0700, true);
putenv('QT_PRIVATE_DIR=' . $tmp);
file_put_contents("$tmp/config.php", "<?php return ['db_dsn' => 'sqlite:$tmp/t.db', 'cors_origins' => []];");
file_put_contents("$tmp/store.php", "<?php return ['stripe_secret' => 'sk_test_x', 'webhook_secret' => 'whsec_test', 'admin_key' => 'sadm_test', 'base_url' => 'https://example.test/store'];");

require_once dirname(__DIR__) . '/lib.php';

$pass = 0; $fail = 0;
function ok(bool $c, string $msg): void { global $pass, $fail; if ($c) { $pass++; echo "  ok  $msg\n"; } else { $fail++; echo "  FAIL $msg\n"; } }

// --- signature
$payload = '{"id":"evt_1","type":"checkout.session.completed"}';
$t = 1700000000;
$sig = 't=' . $t . ',v1=' . hash_hmac('sha256', "$t.$payload", 'whsec_test');
ok(stripe_verify_signature($payload, $sig, 'whsec_test', 300, $t + 10), 'valid signature accepted');
ok(!stripe_verify_signature($payload, $sig, 'whsec_test', 300, $t + 1000), 'stale timestamp rejected');
ok(!stripe_verify_signature($payload . 'x', $sig, 'whsec_test', 300, $t + 10), 'tampered payload rejected');
ok(!stripe_verify_signature($payload, $sig, 'whsec_other', 300, $t + 10), 'wrong secret rejected');
ok(!stripe_verify_signature($payload, '', 'whsec_test'), 'empty header rejected');
ok(!stripe_verify_signature($payload, $sig, ''), 'empty secret rejected (unconfigured webhook never verifies)');

// --- tokens
$tok = store_make_token('cs_test_1', 'AOK-1', 60, 1000);
$c = store_parse_token($tok, 1030);
ok($c !== null && $c['s'] === 'cs_test_1' && $c['k'] === 'AOK-1', 'token round-trips');
ok(store_parse_token($tok, 2000) === null, 'expired token rejected');
ok(store_parse_token(substr($tok, 0, -2) . 'zz', 1030) === null, 'forged token rejected');
ok(store_parse_token('garbage', 1030) === null, 'garbage token rejected');

// --- orders (idempotent across webhook + success)
$pdo = store_pdo();
$session = ['id' => 'cs_test_2', 'metadata' => ['sku' => 'AOK-1'], 'payment_status' => 'paid', 'amount_total' => 2900,
    'currency' => 'usd', 'payment_intent' => 'pi_1', 'customer_details' => ['email' => 'buyer@example.com']];
$o1 = store_record_order($pdo, $session, 'webhook');
$o2 = store_record_order($pdo, $session, 'success');
ok($o1['id'] === $o2['id'], 'second record of same session reuses the row');
ok((int)$pdo->query("SELECT COUNT(*) FROM qt_store_orders WHERE session_id='cs_test_2'")->fetchColumn() === 1, 'exactly one order row');
ok($o2['source'] === 'webhook', 'first writer wins source');
ok($o2['email'] === 'buyer@example.com' && (int)$o2['amount_cents'] === 2900, 'order fields stored');
$unpaid = store_record_order($pdo, ['id' => 'cs_test_3', 'metadata' => ['sku' => 'AOK-1'], 'payment_status' => 'unpaid'], 'success');
ok($unpaid['status'] === 'unpaid', 'unpaid session recorded as unpaid (download.php refuses non-paid)');

$free = store_record_order($pdo, ['id' => 'cs_test_4', 'metadata' => ['sku' => 'AOK-1'], 'payment_status' => 'no_payment_required', 'amount_total' => 0, 'customer_details' => ['email' => 'x@example.com']], 'webhook');
ok($free['status'] === 'paid', '100%-discounted session (no_payment_required) counts as paid');

// --- events
ok(!store_event_seen($pdo, 'evt_a', 'x'), 'first event not seen');
ok(store_event_seen($pdo, 'evt_a', 'x'), 'duplicate event detected');

// --- traffic beacon (E5)
$f = store_hit_fields('view', '/blog/why-x/?a=1', '?utm_source=DevTo&utm_medium=<script>', 'https://www.news.ycombinator.com/item?id=1');
ok($f['path'] === '/blog/why-x/' && $f['utm_source'] === 'devto' && $f['ref_host'] === 'news.ycombinator.com', 'hit fields normalised (path, utm, ref host)');
ok($f['utm_medium'] === 'script', 'hit fields strip markup');
ok(store_hit_fields('evil', '/')['kind'] === 'view', 'unknown hit kind falls back to view');
ok(store_is_bot('Mozilla/5.0 (compatible; Googlebot/2.1)') && store_is_bot('') && !store_is_bot('Mozilla/5.0 (X11; Linux) Firefox/130.0'), 'bot filter');
store_record_hit($pdo, store_hit_fields('view', '/', '?utm_source=hn'), '2026-10-19T00:00:00Z');
store_record_hit($pdo, store_hit_fields('view', '/', '', 'https://google.com/'), '2026-10-19T00:00:01Z');
store_record_hit($pdo, store_hit_fields('view', '/'), '2026-10-19T00:00:02Z');
store_record_hit($pdo, store_hit_fields('checkout', '/checkout/AOK-1', 'utm_source=hn'), '2026-10-19T00:00:03Z');
store_record_hit($pdo, store_hit_fields('view', '/'), '2026-01-01T00:00:00Z');
$h = store_hit_summary($pdo, '2026-10-18T00:00:00Z');
ok($h['visits'] === 3 && $h['checkout_clicks'] === 1, 'hit summary counts visits and checkout clicks in window');
ok(($h['by_source']['hn'] ?? 0) === 1 && ($h['by_source']['google.com'] ?? 0) === 1 && ($h['by_source']['direct'] ?? 0) === 1, 'source = utm, else referrer host, else direct');
ok(($h['checkout_by_source']['hn'] ?? 0) === 1, 'checkout clicks attributed by src');

// --- catalog + files present
foreach (catalog_all() as $sku => $p) {
    ok(is_file(dirname(__DIR__) . '/files/' . $p['file']), "product file exists for $sku ({$p['file']})");
    ok($p['price_cents'] >= 50, "price for $sku is at least Stripe minimum");
}

echo "\n$pass passed, $fail failed\n";
@unlink("$tmp/t.db"); @unlink("$tmp/config.php"); @unlink("$tmp/store.php"); @rmdir($tmp);
exit($fail === 0 ? 0 : 1);
