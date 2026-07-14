<?php
/**
 * Encryption-at-rest helpers. AES-256-GCM via OpenSSL (available on every Hostinger PHP build).
 * Format of stored blobs: base64( iv[12] . tag[16] . ciphertext ).
 */

function qt_encrypt(string $plain, string $keyHex): string {
    $key = hex2bin($keyHex);
    if ($key === false || strlen($key) !== 32) {
        throw new RuntimeException('Bad master key');
    }
    $iv = random_bytes(12);
    $tag = '';
    $cipher = openssl_encrypt($plain, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag, '', 16);
    if ($cipher === false) {
        throw new RuntimeException('Encryption failed');
    }
    return base64_encode($iv . $tag . $cipher);
}

function qt_decrypt(string $blobB64, string $keyHex): string {
    $key = hex2bin($keyHex);
    $raw = base64_decode($blobB64, true);
    if ($key === false || $raw === false || strlen($raw) < 29) {
        throw new RuntimeException('Bad encrypted blob');
    }
    $iv = substr($raw, 0, 12);
    $tag = substr($raw, 12, 16);
    $cipher = substr($raw, 28);
    $plain = openssl_decrypt($cipher, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag);
    if ($plain === false) {
        throw new RuntimeException('Decryption failed (wrong key or corrupted data)');
    }
    return $plain;
}

/** Encrypt bytes to a file inside the private storage dir. */
function qt_encrypt_to_file(string $bytes, string $path, string $keyHex): void {
    $dir = dirname($path);
    if (!is_dir($dir)) {
        mkdir($dir, 0700, true);
    }
    if (file_put_contents($path, qt_encrypt($bytes, $keyHex), LOCK_EX) === false) {
        throw new RuntimeException('Failed writing encrypted file');
    }
}

function qt_decrypt_file(string $path, string $keyHex): string {
    $blob = file_get_contents($path);
    if ($blob === false) {
        throw new RuntimeException('Missing encrypted file');
    }
    return qt_decrypt($blob, $keyHex);
}

/** Privacy-preserving hash (for IP addresses / dedupe) keyed with the master key. */
function qt_keyed_hash(string $value, string $keyHex): string {
    return hash_hmac('sha256', $value, hex2bin($keyHex));
}
