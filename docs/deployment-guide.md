# QualityTester.us Tester API — As-Built Record (deployed 2026-07-30)

**STATUS: LIVE.** The API runs at `https://api.qualitytester.us/api/v1/*`.

Discovery during deployment: qualitytester.us itself is a Hostinger **Web App** (GitHub →
Vite build → static files, no PHP). The API therefore lives on a separate classic-PHP
website on the same Cloud plan: **api.qualitytester.us** (free subdomain, own SSL, Git
auto-deploy from the `api-deploy` branch to its `public_html`). The main site was not
modified in any way.

What was done on 2026-07-30 (via hPanel, in-browser):
1. MySQL database `u963144706_qtapi` + same-named user created and assigned.
2. New website api.qualitytester.us (Custom PHP/HTML) created on the Cloud Startup plan.
3. GIT deploy connected: repo `skibuff22/qualitytester`, branch `api-deploy` →
   `public_html`. Pushes to that branch auto-deploy.
4. `install.php` run once (now permanently locked): tables created, keys generated.
   Vendor API key delivered to Todd in chat; sync secret installed on the Mac Mini
   (launchd plist only, never in git).
5. Mac Mini `com.calyx-pai.qtsync` loaded; first sync pushed 49 testers + 49 certificate
   PDFs; daily run at 05:30.
6. Live verification: 15/15 security+functional tests passed (auth rejection, replay
   guard, forged signature, encrypted cert round-trip, registration round-trip, CORS
   allow/deny, HSTS, HTTP→301→HTTPS, installer and lib/ locked). Main site QA: unchanged.

A clearly-marked test registration ("TEST - Claude e2e verification", serial 23083,
id 1) exists on the server and was acked; ignore or delete it in phpMyAdmin if you like.

---

The original activation instructions below are retained for reference (superseded by
the as-built record above).

## A. Hostinger (one time, ~10 minutes)

1. **Create the database.** hPanel → Websites → qualitytester.us → Databases → *MySQL
   Databases* → create database + user (note database name, username, password; host stays
   `localhost`).

2. **Connect the Git repo.** hPanel → Websites → qualitytester.us → Advanced → **GIT**:
   - Repository: `https://github.com/skibuff22/qualitytester.git`
   - Branch: **`api-deploy`**  ← the branch containing only the API files
   - Directory: `public_html/api` (must be empty/new)
   - Click *Create*, then *Deploy*. (If GitHub reports the repo private, copy the SSH key
     hPanel shows and add it in GitHub → repo → Settings → Deploy keys, then retry.)
   - Optional: copy the *Webhook URL* into GitHub → Settings → Webhooks so future pushes
     to `api-deploy` auto-deploy.

3. **Run the installer.** Visit `https://qualitytester.us/api/install.php`, enter the DB
   credentials from step 1, submit. **Copy the three values it shows — they appear exactly
   once:**
   - *Vendor API key* → goes to the force-test.com vendor (send securely, not email plaintext)
   - *Sync key id* + *Sync secret* → go into the Mac Mini launchd job (step B)

   The installer creates the tables, generates the encryption master key, writes
   `qt_private/config.php` **outside** the webroot, and then permanently disables itself.

4. **Sanity check:** `https://qualitytester.us/api/v1/health` should return
   `{"ok":true,"service":"qualitytester-api",...}`. Then tell me — I'll run the full live
   test suite (auth rejection, CORS, registration round-trip, encryption) and the first sync.

   *If it still returns the React site's HTML:* the SPA rewrite in `public_html/.htaccess`
   is catching `/api/*`. Add this line directly under its `RewriteEngine On`:

   ```
   RewriteCond %{REQUEST_URI} !^/api/
   ```

   (The API ships its own `.htaccess` that normally takes precedence, so this is only a
   fallback.)

## B. Mac Mini (after A) — I can do this part; just give me the sync secret

1. Edit `/Users/pai-admin/Projects/calyx-pai/launchd/com.calyx-pai.qtsync.plist`:
   replace `__FILL_IN_FROM_INSTALLER__` with the *Sync secret* from the installer.
2. Load the daily job (runs 05:30 every morning):
   ```
   cp /Users/pai-admin/Projects/calyx-pai/launchd/com.calyx-pai.qtsync.plist ~/Library/LaunchAgents/
   launchctl bootstrap gui/501 ~/Library/LaunchAgents/com.calyx-pai.qtsync.plist
   ```
3. First sync now (instead of waiting for 05:30):
   ```
   launchctl kickstart gui/501/com.calyx-pai.qtsync
   tail -f /Volumes/KnowledgeVault/PAI/logs/qtsync.log
   ```

## C. Manuals

Drop manual files into `/Volumes/KnowledgeVault/PAI/manuals/` on the Mac:
- `default.html` and `default.pdf` — fallback shown for any model
- `SP1-2KD.html` / `SP1-2KD.pdf` etc. — per-model overrides (exact model number as filename)

The nightly sync uploads new/changed files automatically.

## D. Vendor

Send `docs/vendor-integration-guide.pdf` (or .md) plus the *Vendor API key* to the
force-test.com vendor. They need nothing else — no server credentials, no database access.

## Security model (what was built)

- **One-way connectivity:** only the Mac Mini initiates connections (outbound HTTPS).
  qualitytester.us stores no credential, hostname, or route back to the Mac — nothing on
  the internet can reach the original data source.
- **Encrypted in transit:** HTTPS enforced (301 redirect + HSTS).
- **Encrypted at rest:** customer registrations and certificate PDFs are AES-256-GCM
  encrypted on the server; the key lives in `qt_private/` outside the webroot, never in git.
- **Sync auth:** every Mac request is HMAC-SHA256 signed (method+path+query+timestamp+
  nonce+body hash); 5-minute clock window; single-use nonces block replays. Verified
  byte-identical between the Python signer and PHP verifier.
- **Public tier:** vendor API key + per-IP rate limits + CORS locked to force-test.com;
  registrations are write-only from the internet (no endpoint ever returns them publicly).
- **No secrets in git:** the repo holds code only; keys are generated on the server at
  install time.
