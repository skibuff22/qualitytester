<?php
/**
 * One-time installer. Runs ONLY while <domain-root>/qt_private/config.php does not exist;
 * after installation it permanently refuses to run. Visit https://qualitytester.us/api/install.php
 * immediately after the first deploy, enter the MySQL credentials created in hPanel, and save
 * the generated keys shown once on success.
 */

declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');

require_once __DIR__ . '/lib/config.php';
require_once __DIR__ . '/lib/schema.php';

header('X-Frame-Options: DENY');
header('Cache-Control: no-store');

$privateDir = qt_private_dir();
$configPath = $privateDir . '/config.php';

if (is_file($configPath)) {
    http_response_code(403);
    exit('Already installed. Delete qt_private/config.php manually (via hPanel File Manager) to reinstall.');
}

function esc(string $s): string { return htmlspecialchars($s, ENT_QUOTES); }

$err = '';
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $host = trim($_POST['db_host'] ?? 'localhost');
    $name = trim($_POST['db_name'] ?? '');
    $user = trim($_POST['db_user'] ?? '');
    $pass = (string)($_POST['db_pass'] ?? '');
    if ($name === '' || $user === '') {
        $err = 'Database name and user are required.';
    } else {
        try {
            $dsn = "mysql:host=$host;dbname=$name;charset=utf8mb4";
            $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
            qt_create_tables($pdo);

            $masterKey  = bin2hex(random_bytes(32));
            $vendorKey  = 'ftv_' . bin2hex(random_bytes(24));
            $syncKeyId  = 'macmini-01';
            $syncSecret = bin2hex(random_bytes(32));

            if (!is_dir($privateDir)) {
                mkdir($privateDir, 0700, true);
            }
            foreach (['storage', 'storage/certs', 'storage/manuals'] as $d) {
                if (!is_dir("$privateDir/$d")) {
                    mkdir("$privateDir/$d", 0700, true);
                }
            }
            // Defense-in-depth: block web access even if the dir ever lands inside a docroot.
            file_put_contents($privateDir . '/.htaccess', "Require all denied\n");

            $cfgSrc = "<?php\nreturn [\n"
                . "    'db_dsn'  => " . var_export($dsn, true) . ",\n"
                . "    'db_user' => " . var_export($user, true) . ",\n"
                . "    'db_pass' => " . var_export($pass, true) . ",\n"
                . "    'master_key' => " . var_export($masterKey, true) . ",\n"
                . "    'vendor_api_key' => " . var_export($vendorKey, true) . ",\n"
                . "    'sync_key_id' => " . var_export($syncKeyId, true) . ",\n"
                . "    'sync_secret' => " . var_export($syncSecret, true) . ",\n"
                . "    'cors_origins' => ['https://force-test.com', 'https://www.force-test.com'],\n"
                . "];\n";
            file_put_contents($configPath, $cfgSrc, LOCK_EX);
            chmod($configPath, 0600);

            echo '<!doctype html><meta charset="utf-8"><title>Installed</title>'
                . '<body style="font-family:system-ui;max-width:720px;margin:3em auto">'
                . '<h1>API installed successfully</h1>'
                . '<p><strong>Copy these values NOW - they are shown exactly once.</strong></p>'
                . '<table border="1" cellpadding="8" style="border-collapse:collapse">'
                . '<tr><td>Vendor API key (give to force-test.com vendor)</td><td><code>' . esc($vendorKey) . '</code></td></tr>'
                . '<tr><td>Sync key id (Mac Mini .env QT_SYNC_KEY_ID)</td><td><code>' . esc($syncKeyId) . '</code></td></tr>'
                . '<tr><td>Sync secret (Mac Mini .env QT_SYNC_SECRET)</td><td><code>' . esc($syncSecret) . '</code></td></tr>'
                . '</table>'
                . '<p>The encryption master key was written to qt_private/config.php and is intentionally not displayed.</p>'
                . '<p>Health check: <a href="/api/v1/health">/api/v1/health</a></p>'
                . '</body>';
            exit;
        } catch (Throwable $e) {
            $err = 'Database connection or setup failed: ' . $e->getMessage();
        }
    }
}
?>
<!doctype html><meta charset="utf-8"><title>QualityTester API installer</title>
<body style="font-family:system-ui;max-width:560px;margin:3em auto">
<h1>QualityTester API - one-time install</h1>
<?php if ($err !== '') { echo '<p style="color:#b00">' . esc($err) . '</p>'; } ?>
<form method="post">
  <p><label>MySQL host<br><input name="db_host" value="localhost" style="width:100%"></label></p>
  <p><label>Database name<br><input name="db_name" required style="width:100%"></label></p>
  <p><label>Database user<br><input name="db_user" required style="width:100%"></label></p>
  <p><label>Database password<br><input name="db_pass" type="password" style="width:100%"></label></p>
  <p><button type="submit">Install</button></p>
</form>
<p style="color:#666">Create the database first in hPanel &rarr; Databases &rarr; MySQL Databases.</p>
</body>
