# Configure privately with Ma and a trusted helper

Updated 28 October 2026 (Australia/Sydney). The public `config.json` is a **blank template**, not a place for personal destinations. Do not put numbers, private URLs, medical information, passwords or private photographs into Git, build variables, public assets, PR discussions or screenshots. A private repository would not make delivered web files private.

## One private profile, one deliberate import

1. Copy `config.json` to a securely held `ma-phone.private.json` on the helper's device. Local `private/`, `*.private.json` and `.env*` are ignored by Git, but ignore rules are not encryption or a backup. Never force-add this file. Keep the durable backup in the helper's chosen private storage, not the public repository.
2. On Ma's current working phone, inspect each contact/shortcut destination and compare it with a trusted current contact record. Confirm person, preferred label, number and action. Do not infer that MIMI is MIA or that a historical Git value is current. The prior values remain recoverable in history but are **unverified**; they have not been silently reimported.
3. In the private profile, set each checked contact's `phone` to its exact international-format number (`+`, then 8–15 digits), `verified` to boolean `true` and `verifiedOn` to the actual local check date, `YYYY-MM-DD`. Leave uncertain destinations null, false and null respectively. Invalid/future dates, strings instead of booleans and unsafe destinations are rejected. Verification dates are audit notes, not proof of correctness or automatic expiry.
4. Keep IDs, array order, colour keys and six main positions unchanged. Keep every `photo` null. Familiar initials remain; no private photograph needs to be published. If private photos are important, use native Contacts/Assistive Access rather than uploading them to this host. Profiles with photographs are rejected.
5. Install the blank launcher first using IPHONE_SETUP.md. **Open the installed MA Phone icon**, tap **Helper setup**, choose the private JSON file, tick that destinations were checked and a private backup kept, then tap **SAVE ON THIS DEVICE**. The file is read locally and no upload request is made. There is no PIN pretending to protect a public config.
6. Tap HOME. Close and reopen that installed app, then restart the phone and recheck. Safari and an installed web app may have separate storage; do not assume setup in a Safari tab transfers. If the file picker cannot be used within the installed app on this iOS version, stop and keep native calling; do not publish the profile as a workaround.
7. Arrange ordinary calls with the recipients expecting them. Check recipient, audio, hang-up, incoming calls and reopening MA Phone. **Never call 000 to test.** Do not remove old shortcuts before the complete actual-phone checklist passes.

Every device/browser/origin must be configured separately. Importing a replacement replaces the **whole profile**; there is no silent merge with stale phone numbers. The helper-held profile backup is the source for future changes. Repository template changes do not overwrite installed personal settings. To disable all destinations, import the blank public template. To replace or repair settings, import a checked replacement in Helper setup and repeat the reopen test. There is no automatic cloud restore or sync.

## Supplementary items

Radio & TV contains ABC 702, 2GB and TV GUIDE. More contains the two original MA GOOGLE labels as distinct slots. Their actual destinations/functions remain unverified, so all URLs stay null. Do not assume MA GOOGLE is a search page rather than a voice or Shortcut action. Clarify the duplicate labels with Ma before enabling both.

For a confirmed ordinary website, set its exact HTTPS `url`, `verified:true` and the actual `verifiedOn` in the private profile. Credentials in URLs, HTTP, script/data URLs and arbitrary custom schemes are rejected. Keep Shortcuts/native-app actions native until their intended function is verified and explicitly supported. No podcast URL has been guessed.

## Storage failure and recovery

Missing/corrupt/blocked local storage leaves the blank six-tile shell, a helper message and no personal call links. Emergency confirmation remains available only while the application itself has loaded; native Phone and SOS must remain independent. A failed import does not activate its new values. Invalid files, unexpected tile ordering and files larger than 64 KiB are rejected.

Clearing website data, private browsing, reinstalling, changing the hostname or browser storage policies can remove settings. Do not use Private Browsing for installation. Import in the installed app, verify persistence, retain a private backup and retain native contacts. Do not promise offline launch: there is no service worker. An already handed-off ordinary call is handled by native Phone.

Anyone with device access or code running on the same origin may read the profile. The hosting account must remain controlled by a trusted helper; do not add third-party scripts or analytics. Local storage is not encrypted application storage and does not provide authentication.
