<?php
/**
 * Configuration loader.
 *
 * The real configuration lives OUTSIDE the webroot in <domain-root>/qt_private/config.php
 * (created once by install.php). Nothing secret is ever stored inside public_html or in git.
 */

function qt_private_dir(): string {
    $env = getenv('QT_PRIVATE_DIR');
    if ($env !== false && $env !== '') {
        return rtrim($env, '/');
    }
    $docroot = $_SERVER['DOCUMENT_ROOT'] ?? '';
    if ($docroot === '') {
        // CLI fallback (tests)
        return sys_get_temp_dir() . '/qt_private';
    }
    return dirname(rtrim($docroot, '/')) . '/qt_private';
}

function qt_config(): array {
    static $cfg = null;
    if ($cfg !== null) {
        return $cfg;
    }
    $path = qt_private_dir() . '/config.php';
    if (!is_file($path)) {
        http_response_code(503);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'API not installed. Run install.php once.']);
        exit;
    }
    $cfg = require $path;
    $cfg['private_dir'] = qt_private_dir();
    $cfg['storage_dir'] = $cfg['private_dir'] . '/storage';
    return $cfg;
}

function qt_pdo(array $cfg): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $pdo = new PDO($cfg['db_dsn'], $cfg['db_user'] ?? null, $cfg['db_pass'] ?? null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
    }
    return $pdo;
}
