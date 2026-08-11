<?php
/** Table creation - portable across MySQL (production) and SQLite (tests). */

/** MySQL 8 lacks CREATE INDEX IF NOT EXISTS; a duplicate index error is simply ignored. */
function qt_try_index(PDO $pdo, string $sql): void {
    try {
        $pdo->exec($sql);
    } catch (Throwable $e) {
        // index already exists - fine
    }
}

/**
 * Owner/registration display columns (2026-08-11). install.php is permanently locked
 * after first run, so existing production tables are migrated lazily: a cheap probe of
 * one new column, and only on failure the ALTERs run (each ignored if already present).
 * The masked values are produced ON THE MAC before push - this server never stores a
 * current owner's full email/phone in qt_testers.
 */
function qt_migrate_owner_columns(PDO $pdo): void {
    try {
        $pdo->query('SELECT reg_company FROM qt_testers LIMIT 1');
        return; // columns already present
    } catch (Throwable $e) {
        // fall through and add them
    }
    foreach ([
        'ALTER TABLE qt_testers ADD COLUMN reg_company VARCHAR(300) NULL',
        'ALTER TABLE qt_testers ADD COLUMN reg_contact_name VARCHAR(300) NULL',
        'ALTER TABLE qt_testers ADD COLUMN reg_email_masked VARCHAR(300) NULL',
        'ALTER TABLE qt_testers ADD COLUMN reg_phone_masked VARCHAR(64) NULL',
    ] as $sql) {
        qt_try_index($pdo, $sql);
    }
}

function qt_create_tables(PDO $pdo): void {
    $driver = $pdo->getAttribute(PDO::ATTR_DRIVER_NAME);
    $ai = $driver === 'mysql' ? 'INT NOT NULL AUTO_INCREMENT PRIMARY KEY' : 'INTEGER PRIMARY KEY AUTOINCREMENT';
    $blob = $driver === 'mysql' ? 'MEDIUMTEXT' : 'TEXT';

    $pdo->exec("CREATE TABLE IF NOT EXISTS qt_testers (
        serial VARCHAR(64) PRIMARY KEY,
        model VARCHAR(64) NULL,
        gage_type VARCHAR(16) NULL,
        capacity INT NULL,
        last_cal_date VARCHAR(10) NULL,
        cal_due_date VARCHAR(10) NULL,
        record_id VARCHAR(32) NULL,
        reg_company VARCHAR(300) NULL,
        reg_contact_name VARCHAR(300) NULL,
        reg_email_masked VARCHAR(300) NULL,
        reg_phone_masked VARCHAR(64) NULL,
        updated_at VARCHAR(32) NOT NULL
    )");
    qt_migrate_owner_columns($pdo);

    $pdo->exec("CREATE TABLE IF NOT EXISTS qt_certificates (
        id $ai,
        serial VARCHAR(64) NOT NULL,
        record_id VARCHAR(32) NOT NULL,
        cal_date VARCHAR(10) NULL,
        file_path VARCHAR(255) NOT NULL,
        sha256 CHAR(64) NOT NULL,
        uploaded_at VARCHAR(32) NOT NULL,
        is_latest SMALLINT NOT NULL DEFAULT 1
    )");
    qt_try_index($pdo, 'CREATE INDEX idx_qt_certs_serial ON qt_certificates (serial, is_latest)');

    $pdo->exec("CREATE TABLE IF NOT EXISTS qt_manuals (
        model VARCHAR(64) PRIMARY KEY,
        html_path VARCHAR(255) NULL,
        pdf_path VARCHAR(255) NULL,
        updated_at VARCHAR(32) NOT NULL
    )");

    $pdo->exec("CREATE TABLE IF NOT EXISTS qt_registrations (
        id $ai,
        serial VARCHAR(64) NOT NULL,
        payload_enc $blob NOT NULL,
        email_hash CHAR(64) NOT NULL,
        ip_hash CHAR(64) NOT NULL,
        created_at VARCHAR(32) NOT NULL,
        synced_at VARCHAR(32) NULL
    )");
    qt_try_index($pdo, 'CREATE INDEX idx_qt_reg_serial ON qt_registrations (serial)');
    qt_try_index($pdo, 'CREATE INDEX idx_qt_reg_synced ON qt_registrations (synced_at)');

    $pdo->exec('CREATE TABLE IF NOT EXISTS qt_nonces (
        sig CHAR(64) PRIMARY KEY,
        seen_at INT NOT NULL
    )');

    $pdo->exec('CREATE TABLE IF NOT EXISTS qt_ratelimit (
        bucket VARCHAR(128) PRIMARY KEY,
        window_start INT NOT NULL,
        cnt INT NOT NULL
    )');
}
