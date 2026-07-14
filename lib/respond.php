<?php
/** Response helpers + CORS. */

function qt_security_headers(): void {
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: no-referrer');
    header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
    header('Cache-Control: no-store');
}

/** CORS is only granted to the configured landing-page origins (force-test.com). */
function qt_cors(array $cfg): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin !== '' && in_array($origin, $cfg['cors_origins'], true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-API-Key');
        header('Access-Control-Max-Age: 86400');
    }
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function qt_json(array $data, int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_SLASHES);
    exit;
}

function qt_error(string $message, int $code): void {
    qt_json(['error' => $message], $code);
}

function qt_client_ip(): string {
    // Hostinger sits behind its own proxy layer; REMOTE_ADDR is still the canonical value
    // exposed to PHP. Do NOT trust X-Forwarded-For blindly (spoofable).
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}
