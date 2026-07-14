<?php
/**
 * qualitytester.us tester-data API - front controller.
 *
 * Public (vendor key):   GET  /api/v1/testers/{serial}
 *                        GET  /api/v1/testers/{serial}/manual
 *                        GET  /api/v1/testers/{serial}/manual.pdf
 *                        GET  /api/v1/testers/{serial}/certificate.pdf
 *                        POST /api/v1/testers/{serial}/register
 * Sync (Mac Mini HMAC):  POST /api/v1/sync/testers
 *                        POST /api/v1/sync/certificates/{serial}?record_id=&cal_date=
 *                        POST /api/v1/sync/manuals/{model}?type=html|pdf
 *                        GET  /api/v1/sync/registrations[?since=ISO]
 *                        POST /api/v1/sync/registrations/ack
 * Open:                  GET  /api/v1/health
 */

declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0'); // never leak stack traces to the internet

require_once __DIR__ . '/lib/config.php';
require_once __DIR__ . '/lib/respond.php';
require_once __DIR__ . '/lib/auth.php';
require_once __DIR__ . '/lib/handlers_public.php';
require_once __DIR__ . '/lib/handlers_sync.php';

qt_security_headers();

set_exception_handler(function (Throwable $e) {
    error_log('[qt-api] ' . $e->getMessage());
    qt_error('Internal error', 500);
});

$cfg = qt_config();
qt_cors($cfg);
$pdo = qt_pdo($cfg);

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($uri, PHP_URL_PATH) ?: '/';
$rawBody = file_get_contents('php://input') ?: '';
$ip = qt_client_ip();

// ---- health ----
if ($path === '/api/v1/health') {
    qt_json(['ok' => true, 'service' => 'qualitytester-api', 'time' => qt_now()]);
}

// ---- sync tier (HMAC; stricter matching first) ----
if (strpos($path, '/api/v1/sync/') === 0) {
    qt_rate_limit($pdo, 'sync:' . $ip, 600, 60);
    qt_require_sync_auth($cfg, $pdo, $rawBody);

    if ($method === 'POST' && $path === '/api/v1/sync/testers') {
        handle_sync_testers($pdo, $cfg, $rawBody);
    }
    if ($method === 'POST' && preg_match('#^/api/v1/sync/certificates/([^/]+)$#', $path, $m)) {
        handle_sync_certificate($pdo, $cfg, qt_validate_serial(rawurldecode($m[1])), $rawBody);
    }
    if ($method === 'POST' && preg_match('#^/api/v1/sync/manuals/([^/]+)$#', $path, $m)) {
        handle_sync_manual($pdo, $cfg, rawurldecode($m[1]), $rawBody);
    }
    if ($method === 'GET' && $path === '/api/v1/sync/registrations') {
        handle_sync_get_registrations($pdo, $cfg);
    }
    if ($method === 'POST' && $path === '/api/v1/sync/registrations/ack') {
        handle_sync_ack($pdo, $cfg, $rawBody);
    }
    qt_error('Not found', 404);
}

// ---- public tier (vendor key) ----
if (preg_match('#^/api/v1/testers/([^/]+)(/.*)?$#', $path, $m)) {
    $serial = qt_validate_serial(rawurldecode($m[1]));
    $tail = $m[2] ?? '';
    qt_require_vendor_key($cfg);

    if ($method === 'GET' && ($tail === '' || $tail === '/')) {
        qt_rate_limit($pdo, 'read:' . $ip, 120, 60);
        handle_get_tester($pdo, $cfg, $serial);
    }
    if ($method === 'GET' && $tail === '/manual') {
        qt_rate_limit($pdo, 'read:' . $ip, 120, 60);
        handle_get_manual($pdo, $cfg, $serial, false);
    }
    if ($method === 'GET' && $tail === '/manual.pdf') {
        qt_rate_limit($pdo, 'read:' . $ip, 120, 60);
        handle_get_manual($pdo, $cfg, $serial, true);
    }
    if ($method === 'GET' && $tail === '/certificate.pdf') {
        qt_rate_limit($pdo, 'read:' . $ip, 60, 60);
        handle_get_certificate($pdo, $cfg, $serial);
    }
    if ($method === 'POST' && $tail === '/register') {
        qt_rate_limit($pdo, 'register:' . $ip, 10, 3600);
        handle_register($pdo, $cfg, $serial, $rawBody);
    }
}

qt_error('Not found', 404);
