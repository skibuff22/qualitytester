<?php
/** Public endpoints consumed by the force-test.com landing page (vendor key required). */

require_once __DIR__ . '/store.php';
require_once __DIR__ . '/crypto.php';

function qt_validate_serial(string $serial): string {
    if (!preg_match('/^[A-Za-z0-9._-]{1,64}$/', $serial)) {
        qt_error('Invalid serial number format', 400);
    }
    return $serial;
}

function handle_get_tester(PDO $pdo, array $cfg, string $serial): void {
    $t = qt_get_tester($pdo, $serial);
    if ($t === null) {
        qt_error('Tester not found', 404);
    }
    $manual = qt_get_manual($pdo, $t['model'] ?? null);
    $cert = qt_latest_certificate($pdo, $serial);
    $base = '/api/v1/testers/' . rawurlencode($serial);
    qt_json([
        'serial'         => $t['serial'],
        'model'          => $t['model'],
        'gage_type'      => $t['gage_type'],
        'capacity_lbs'   => $t['capacity'] !== null ? (int)$t['capacity'] : null,
        'last_cal_date'  => $t['last_cal_date'],
        'cal_due_date'   => $t['cal_due_date'],
        'registered'     => qt_has_registration($pdo, $serial),
        'has_certificate'=> $cert !== null,
        'certificate_date' => $cert['cal_date'] ?? null,
        'manual'         => [
            'html_url' => ($manual && $manual['html_path']) ? $base . '/manual' : null,
            'pdf_url'  => ($manual && $manual['pdf_path']) ? $base . '/manual.pdf' : null,
        ],
        'certificate_pdf_url' => $cert !== null ? $base . '/certificate.pdf' : null,
    ]);
}

function handle_get_manual(PDO $pdo, array $cfg, string $serial, bool $pdf): void {
    $t = qt_get_tester($pdo, $serial);
    if ($t === null) {
        qt_error('Tester not found', 404);
    }
    $manual = qt_get_manual($pdo, $t['model'] ?? null);
    $path = $manual === null ? null : ($pdf ? $manual['pdf_path'] : $manual['html_path']);
    if ($path === null || !is_file($cfg['storage_dir'] . '/' . $path)) {
        qt_error('Manual not available', 404);
    }
    $bytes = file_get_contents($cfg['storage_dir'] . '/' . $path);
    if ($pdf) {
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="sp1.pdf"');
    } else {
        header('Content-Type: text/html; charset=utf-8');
        header("Content-Security-Policy: default-src 'none'; img-src data: https:; style-src 'unsafe-inline'");
    }
    header('Content-Length: ' . strlen($bytes));
    echo $bytes;
    exit;
}

function handle_get_certificate(PDO $pdo, array $cfg, string $serial): void {
    $cert = qt_latest_certificate($pdo, $serial);
    if ($cert === null) {
        qt_error('No certificate on file for this serial number', 404);
    }
    $full = $cfg['storage_dir'] . '/' . $cert['file_path'];
    if (!is_file($full)) {
        qt_error('Certificate file missing', 404);
    }
    $pdf = qt_decrypt_file($full, $cfg['master_key']);
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="calibration-' . $serial . '.pdf"');
    header('Content-Length: ' . strlen($pdf));
    echo $pdf;
    exit;
}

function handle_register(PDO $pdo, array $cfg, string $serial, string $rawBody): void {
    $t = qt_get_tester($pdo, $serial);
    if ($t === null) {
        qt_error('Tester not found', 404);
    }
    $data = json_decode($rawBody, true);
    if (!is_array($data)) {
        qt_error('Body must be JSON', 400);
    }
    $fields = ['company', 'contact_name', 'email', 'phone', 'address', 'city', 'state', 'zip', 'country', 'purchase_date'];
    $clean = [];
    foreach ($fields as $f) {
        $v = isset($data[$f]) ? trim((string)$data[$f]) : '';
        if (strlen($v) > 300) {
            qt_error("Field '$f' too long", 400);
        }
        $clean[$f] = $v;
    }
    foreach (['company', 'contact_name', 'email'] as $req) {
        if ($clean[$req] === '') {
            qt_error("Field '$req' is required", 400);
        }
    }
    if (!filter_var($clean['email'], FILTER_VALIDATE_EMAIL)) {
        qt_error('Invalid email address', 400);
    }
    $clean['serial'] = $serial;
    $clean['submitted_at'] = qt_now();
    $payloadEnc = qt_encrypt(json_encode($clean, JSON_UNESCAPED_SLASHES), $cfg['master_key']);
    $emailHash = qt_keyed_hash(strtolower($clean['email']), $cfg['master_key']);
    $ipHash = qt_keyed_hash(qt_client_ip(), $cfg['master_key']);
    $id = qt_insert_registration($pdo, $serial, $payloadEnc, $emailHash, $ipHash);
    qt_json(['ok' => true, 'registration_id' => $id], 201);
}
