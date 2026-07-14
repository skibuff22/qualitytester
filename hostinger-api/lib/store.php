<?php
/** Data access layer. Portable SQL (tested on SQLite in CI, MySQL in production). */

function qt_now(): string {
    return gmdate('Y-m-d\TH:i:s\Z');
}

// ------------------------------------------------------------------ testers

function qt_get_tester(PDO $pdo, string $serial): ?array {
    $st = $pdo->prepare('SELECT * FROM qt_testers WHERE serial = ?');
    $st->execute([$serial]);
    $row = $st->fetch();
    return $row === false ? null : $row;
}

function qt_upsert_tester(PDO $pdo, array $t): void {
    $st = $pdo->prepare(
        'UPDATE qt_testers SET model=?, gage_type=?, capacity=?, last_cal_date=?, cal_due_date=?, record_id=?, updated_at=? WHERE serial=?'
    );
    $vals = [
        $t['model'] ?? null, $t['gage_type'] ?? null,
        isset($t['capacity']) ? (int)$t['capacity'] : null,
        $t['last_cal_date'] ?? null, $t['cal_due_date'] ?? null,
        $t['record_id'] ?? null, qt_now(),
    ];
    $st->execute(array_merge($vals, [$t['serial']]));
    if ($st->rowCount() === 0) {
        $chk = $pdo->prepare('SELECT 1 FROM qt_testers WHERE serial = ?');
        $chk->execute([$t['serial']]);
        if ($chk->fetch() === false) {
            $ins = $pdo->prepare(
                'INSERT INTO qt_testers (serial, model, gage_type, capacity, last_cal_date, cal_due_date, record_id, updated_at)
                 VALUES (?,?,?,?,?,?,?,?)'
            );
            $ins->execute(array_merge([$t['serial']], $vals));
        }
    }
}

// ------------------------------------------------------------------ certificates

function qt_latest_certificate(PDO $pdo, string $serial): ?array {
    $st = $pdo->prepare('SELECT * FROM qt_certificates WHERE serial = ? AND is_latest = 1 ORDER BY id DESC');
    $st->execute([$serial]);
    $row = $st->fetch();
    return $row === false ? null : $row;
}

function qt_store_certificate(PDO $pdo, string $serial, string $recordId, ?string $calDate, string $filePath, string $sha256): void {
    $pdo->prepare('UPDATE qt_certificates SET is_latest = 0 WHERE serial = ?')->execute([$serial]);
    $pdo->prepare(
        'INSERT INTO qt_certificates (serial, record_id, cal_date, file_path, sha256, uploaded_at, is_latest)
         VALUES (?,?,?,?,?,?,1)'
    )->execute([$serial, $recordId, $calDate, $filePath, $sha256, qt_now()]);
}

// ------------------------------------------------------------------ manuals

function qt_get_manual(PDO $pdo, ?string $model): ?array {
    if ($model !== null && $model !== '') {
        $st = $pdo->prepare('SELECT * FROM qt_manuals WHERE model = ?');
        $st->execute([$model]);
        $row = $st->fetch();
        if ($row !== false) {
            return $row;
        }
    }
    $st = $pdo->prepare("SELECT * FROM qt_manuals WHERE model = 'default'");
    $st->execute();
    $row = $st->fetch();
    return $row === false ? null : $row;
}

function qt_upsert_manual(PDO $pdo, string $model, ?string $htmlPath, ?string $pdfPath): void {
    $existing = null;
    $st = $pdo->prepare('SELECT * FROM qt_manuals WHERE model = ?');
    $st->execute([$model]);
    $existing = $st->fetch() ?: null;
    if ($existing === null) {
        $pdo->prepare('INSERT INTO qt_manuals (model, html_path, pdf_path, updated_at) VALUES (?,?,?,?)')
            ->execute([$model, $htmlPath, $pdfPath, qt_now()]);
    } else {
        $pdo->prepare('UPDATE qt_manuals SET html_path = COALESCE(?, html_path), pdf_path = COALESCE(?, pdf_path), updated_at = ? WHERE model = ?')
            ->execute([$htmlPath, $pdfPath, qt_now(), $model]);
    }
}

// ------------------------------------------------------------------ registrations

function qt_insert_registration(PDO $pdo, string $serial, string $payloadEnc, string $emailHash, string $ipHash): int {
    $pdo->prepare(
        'INSERT INTO qt_registrations (serial, payload_enc, email_hash, ip_hash, created_at, synced_at)
         VALUES (?,?,?,?,?,NULL)'
    )->execute([$serial, $payloadEnc, $emailHash, $ipHash, qt_now()]);
    return (int)$pdo->lastInsertId();
}

function qt_has_registration(PDO $pdo, string $serial): bool {
    $st = $pdo->prepare('SELECT 1 FROM qt_registrations WHERE serial = ?');
    $st->execute([$serial]);
    return $st->fetch() !== false;
}

function qt_unsynced_registrations(PDO $pdo, ?string $since): array {
    if ($since !== null && $since !== '') {
        $st = $pdo->prepare('SELECT * FROM qt_registrations WHERE synced_at IS NULL OR created_at > ? ORDER BY id');
        $st->execute([$since]);
    } else {
        $st = $pdo->prepare('SELECT * FROM qt_registrations WHERE synced_at IS NULL ORDER BY id');
        $st->execute();
    }
    return $st->fetchAll();
}

function qt_ack_registrations(PDO $pdo, array $ids): int {
    $n = 0;
    $st = $pdo->prepare('UPDATE qt_registrations SET synced_at = ? WHERE id = ?');
    foreach ($ids as $id) {
        $st->execute([qt_now(), (int)$id]);
        $n += $st->rowCount();
    }
    return $n;
}
