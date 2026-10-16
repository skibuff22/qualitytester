<?php
/** Read-only order listing for the owner's metrics scripts. Requires X-Admin-Key. */

declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');

require_once __DIR__ . '/lib.php';

header('Content-Type: application/json');
header('Cache-Control: no-store');

$cfg = store_config();
$given = $_SERVER['HTTP_X_ADMIN_KEY'] ?? '';
if ($given === '' || !hash_equals((string)$cfg['admin_key'], $given)) {
    http_response_code(403);
    echo '{"error":"forbidden"}';
    exit;
}

$pdo = store_pdo();
$limit = max(1, min(500, (int)($_GET['limit'] ?? 100)));
$rows = $pdo->query("SELECT id, session_id, sku, email, amount_cents, currency, status, source, email_sent_at, downloads, created_at
                     FROM qt_store_orders ORDER BY id DESC LIMIT $limit")->fetchAll();
$totals = $pdo->query("SELECT COUNT(*) AS orders, COALESCE(SUM(amount_cents),0) AS cents FROM qt_store_orders WHERE status='paid'")->fetch();
$events = (int)$pdo->query('SELECT COUNT(*) FROM qt_store_events')->fetchColumn();
echo json_encode(['ok' => true, 'paid_orders' => (int)$totals['orders'], 'gross_cents' => (int)$totals['cents'],
    'webhook_events' => $events, 'orders' => $rows], JSON_UNESCAPED_SLASHES);
