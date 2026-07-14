<?php
/** Sync endpoints - callable ONLY by the Mac Mini (HMAC-signed, one-way, Mac-initiated). */

require_once __DIR__ . '/store.php';
require_once __DIR__ . '/crypto.php';

function handle_sync_testers(PDO $pdo, array $cfg, string $rawBody): void {
    $list = json_decode($rawBody, true);
    if (!is_array($list)) {
        qt_error('Body must be a JSON array of tester objects', 400);
    }
    $n = 0;
    foreach ($list as $t) {
        if (!is_array($t) || empty($t['serial'])) {
            continue;
        }
        $t['serial'] = (string)$t['serial'];
        if (!preg_match('/^[A-Za-z0-9._-]{1,64}$/', $t['serial'])) {
            continue;
        }
        qt_upsert_tester($pdo, $t);
        $n++;
    }
    qt_json(['ok' => true, 'upserted' => $n]);
}

function handle_sync_certificate(PDO $pdo, array $cfg, string $serial, string $rawBody): void {
    if ($rawBody === '' || substr($rawBody, 0, 5) !== '%PDF-') {
        qt_error('Body must be a raw PDF', 400);
    }
    if (strlen($rawBody) > 10 * 1024 * 1024) {
        qt_error('PDF too large', 413);
    }
    $recordId = $_GET['record_id'] ?? '';
    $calDate  = $_GET['cal_date'] ?? null;
    if (!preg_match('/^[A-Za-z0-9-]{4,32}$/', $recordId)) {
        qt_error('record_id query parameter required', 400);
    }
    if (qt_get_tester($pdo, $serial) === null) {
        qt_error('Unknown tester - sync tester records first', 409);
    }
    $sha = hash('sha256', $rawBody);
    $rel = 'certs/' . $serial . '/' . $recordId . '.pdf.enc';
    qt_encrypt_to_file($rawBody, $cfg['storage_dir'] . '/' . $rel, $cfg['master_key']);
    qt_store_certificate($pdo, $serial, $recordId, $calDate, $rel, $sha);
    qt_json(['ok' => true, 'serial' => $serial, 'record_id' => $recordId, 'sha256' => $sha], 201);
}

function handle_sync_manual(PDO $pdo, array $cfg, string $model, string $rawBody): void {
    $type = $_GET['type'] ?? '';
    if (!in_array($type, ['html', 'pdf'], true)) {
        qt_error("type query parameter must be 'html' or 'pdf'", 400);
    }
    if ($rawBody === '') {
        qt_error('Empty body', 400);
    }
    if (strlen($rawBody) > 25 * 1024 * 1024) {
        qt_error('Manual too large', 413);
    }
    if (!preg_match('/^[A-Za-z0-9._-]{1,64}$/', $model)) {
        qt_error('Invalid model', 400);
    }
    if ($type === 'pdf' && substr($rawBody, 0, 5) !== '%PDF-') {
        qt_error('Body is not a PDF', 400);
    }
    $rel = 'manuals/' . $model . '.' . $type;
    $dir = dirname($cfg['storage_dir'] . '/' . $rel);
    if (!is_dir($dir)) {
        mkdir($dir, 0700, true);
    }
    file_put_contents($cfg['storage_dir'] . '/' . $rel, $rawBody, LOCK_EX);
    qt_upsert_manual($pdo, $model, $type === 'html' ? $rel : null, $type === 'pdf' ? $rel : null);
    qt_json(['ok' => true, 'model' => $model, 'type' => $type], 201);
}

function handle_sync_get_registrations(PDO $pdo, array $cfg): void {
    $since = $_GET['since'] ?? null;
    $rows = qt_unsynced_registrations($pdo, $since);
    $out = [];
    foreach ($rows as $r) {
        try {
            $payload = json_decode(qt_decrypt($r['payload_enc'], $cfg['master_key']), true);
        } catch (Throwable $e) {
            $payload = ['error' => 'undecryptable'];
        }
        $out[] = [
            'id' => (int)$r['id'],
            'serial' => $r['serial'],
            'created_at' => $r['created_at'],
            'synced_at' => $r['synced_at'],
            'data' => $payload,
        ];
    }
    qt_json(['registrations' => $out, 'count' => count($out)]);
}

function handle_sync_ack(PDO $pdo, array $cfg, string $rawBody): void {
    $data = json_decode($rawBody, true);
    if (!is_array($data) || !isset($data['ids']) || !is_array($data['ids'])) {
        qt_error("Body must be JSON: {\"ids\": [..]}", 400);
    }
    $n = qt_ack_registrations($pdo, $data['ids']);
    qt_json(['ok' => true, 'acked' => $n]);
}
