# Privacy, dependable access and deployment

Review date: 28 October 2026, Australia/Sydney. The design goal is the same six familiar tiles and call safeguards, no everyday sign-in, no personal destinations in publicly delivered files, and recovery that does not depend on the launcher.

## Recommendation

Use a **public blank launcher shell on a dedicated stable Netlify origin, with a private profile imported locally inside the installed app**. This is the best fit for retaining the six-tile interface without daily passwords. The existing Netlify account is already available, so no new hosting provider or authentication stack is needed.

For the strongest privacy and dependable calling, **native Contacts/Phone favourites or a supervised Assistive Access trial remain the better foundation**. They avoid browser storage and hosting dependencies. Keep them available independently even if Ma prefers the web launcher. Paid managed-device deployment is the premium option only if someone will administer it; it is unnecessary for this first installation.

Do not overwrite `callma` or `macallme` yet: their relationship to Ma's currently installed icon is unconfirmed. A dedicated **ma-phone-launcher** project has been created in the existing Netlify team. Its permanent intended origin is `https://ma-phone-launcher.netlify.app`, site ID `058897df-30ad-4a38-b267-88f8d49db380`. **Project creation is not publication.** No reviewed build has been uploaded to it in this review. Install only after the live release gate passes. Once the new installation succeeds, establish which old sites/icons are still needed before retiring copies.

## Realistic options

| Arrangement | What remains accessible | Everyday reliability and maintenance | Call |
| --- | --- | --- | --- |
| Public Netlify shell + device-local profile | Everyone can read shell, familiar labels, colours, icons and blank config. The profile is not served; same-origin code/device access can read its local copy. Host sees ordinary request metadata. Old history/hosts remain exposed until separately contained. | No daily login. Stable origin. One helper import per installed app; storage loss needs reimport. Fresh loads need internet. | **Best overall/value for this six-tile design; chosen arrangement.** |
| GitHub Pages or another static host + the same local profile | Same delivered-file exposure as above. Public Git history remains public. A private source repo does not ordinarily make a Pages site private. | No daily login; practical alternative, but migrating provider/origin gains no inherent browser-data privacy and needs fresh setup. | Fine fallback, no reason to move now. |
| Private repository + public host with personal config baked into the build | Source access is restricted. **All published numbers/photos/config are still readable by any visitor**, including from scripts/network tools. Build environment variables become public if rendered into client output. | Simple daily use but fails the privacy goal. | Avoid. Private source is useful additional containment, not a substitute for removing public payloads. |
| Password/team-login/private ChatGPT Site | Unauthorized visitors are gated only if protection covers every file and alternate deployment URL. Authorized browsers still receive readable personal data. Repository/history protection is separate. | Sessions expire; sign-in/SSO/password screens can interrupt access. No guarantee that one initial login lasts. | Poor fit for Ma's everyday launcher. |
| Unlisted/random URL, noindex, hidden config, obfuscated numbers, client-side PIN or bundled encryption key | Anyone who gets the URL/files can read or recover the data. Robots guidance is voluntary. | Appears simple but provides no meaningful access control. | Avoid false privacy. |
| Home server, VPN/Tailscale or device certificates | Access can be restricted when properly operated; authorized browsers still receive data. Device itself remains a trust boundary. | Network/VPN/certificate renewals and troubleshooting add failure modes; cellular and public-network access need testing. | Too much maintenance here. |
| Native Phone/Contacts, optionally Assistive Access | Contacts stay within the device and any enabled Apple/account sync or backup; no launcher website publishes them. Native privacy is still affected by account/device access. | Best independence from this host, browser data and website loading. Calls still need applicable network/service. Assistive Access requires a supervised device trial. | **My choice for the calling foundation**, with this launcher as an optional familiar front end. |

No browser-delivered application can hide delivered data from the browser/user running it. Local storage reduces server publication; it does not protect against someone holding the unlocked device, injected or malicious same-origin code, or a compromised hosting account. CSP reduces some injection/external-request opportunities, not a dishonest origin. A password would not change those limits after access is granted.

## Exposure found and what changed

- The repository is public. The reviewed draft's four contact numbers appeared in `config.json` and `archive/index.original.html`; `main` and older commits also retain personal values. An additional number-shaped placeholder comment in the archive was removed.
- The current branch template now has null contact numbers, website URLs and photographs, with all destinations unverified. The archive's four telephone destinations are redacted. Labels/order/colours and existing icons remain; personal photos have not been added. The existing icon inspected during this work is a flat-colour square, not a portrait.
- No private profile is placed in source, build output, URLs, logs or a server database. Helper import reads the selected local file and writes only browser storage. Normal contact destinations are resolved from the device profile, with the same explicit verification/date gate and confirmation safeguards.
- The build copies only the application, public icons, blank config, manifest, robots and headers. It does not copy archive, docs, QA, tests or `private/`. A publication gate rejects non-blank template destinations, literal phone numbers in public text and asset photographs. This is not an OCR, Git-history or general personal-information detector.
- No analytics, third-party script, remote font, contact-fetch endpoint or service worker is introduced. Server headers request no-store, noindex and no-referrer, deny framing and restrict script/network origins. **These are hygiene, not authentication.** Downloads, screenshots, caches or previous copies may survive.

## Residual exposure and containment

**This branch update does not erase earlier publication.** It deliberately preserves the existing draft PR, previous commits and historical test evidence. There is no force push, history rewrite, main update, merge, repository-visibility change or deletion of an older deployment in this work.

The connected account confirmed two unprotected production projects:

| Project | Site ID | Existing published deploy | Observed state |
| --- | --- | --- | --- |
| callma | `3ed529a4-00eb-4691-88c1-ff18ab4c697d` | `6a03b3fa3e22d2006044324f` | Ready, manual deployment from 12 May 2026; no visitor password/team-login protection. Live build comparison fails at index.html, so it is not this reviewed build. A read-only HTML check finds five tel links and three of the four prior draft contact values still in the response. |
| macallme | `73ed6666-f801-43e2-85f6-d2e46019f4af` | `6a0068bf0c09100a63c77ff9` | Ready, manual deployment from 10 May 2026; no visitor password/team-login protection. HTML contains one tel link; none of the four prior draft contact values matched. This is not a full personal-data audit. |

Those sites and their immutable deploy URLs must be considered possible additional copies; updating a new host does not remove them. No old site has been disabled while its role on Ma's phone remains unknown. The new project's visitor controls report no password/team login; its reviewed release is not yet published.

Recommended remaining containment:

1. Make the existing repository **private** through the owner's repository settings to restrict casual access to its main/history while retaining PR #1 and its evidence. This has not been performed; the connected GitHub tools do not expose repository visibility changes. A private repo does not undo prior clones, forks, downloads or caches, and published site files remain public.
2. Identify the exact current icon/host on Ma's phone during installation. After native fallback and the new installation pass, sanitise or retire obsolete sites and review old deploy permalinks/retained downloads. Do not just rename a site or remove an icon and assume its copies vanished.
3. If stronger removal from Git history is wanted, plan it separately with GitHub's sensitive-data-removal guidance. Rewriting/force-pushing can disrupt PR references and test evidence and still cannot remove other people's copies. Phone numbers cannot be rotated like API credentials; do not claim the exposure is undone.

## Repeatable release procedure

1. Use this existing draft branch. Review the diff; do not merge, mark ready or change `main` merely to deploy a trial. Never configure the old unredacted `main` as the production build source.
2. Run the checks below. Preserve the reviewed clean `dist/` snapshot privately with the release record if it will be needed for recovery. It contains the blank shell, never the private profile.

   ```sh
   node --check app.js
   node --check scripts/check-deployment.mjs
   node --test tests/*.test.cjs
   node scripts/build.mjs
   git diff --check
   ```

3. Publish **only this clean `dist/`** into the existing newly created `ma-phone-launcher` project. Use its project/site ID above to avoid accidentally creating another host or overwriting an old one. Keep `.netlify/` ignored when linking a CLI checkout. Do not deploy the repository root, a QA build, or private JSON. The connected Netlify tool can inspect/create projects but does not expose a file-upload deploy operation; browser dashboard access currently requires sign-in. No upload is claimed from merely creating the project.
4. For ongoing Git deployment, connect this repository only after the privacy-reviewed branch is selected and reviewed; the checked `netlify.toml` sets Node 24, tests, build and `publish = "dist"`. Repository linkage, production branch and actual dashboard build settings are **not yet configured/verified**. Prefer a manual reviewed first release until the PR is ready. A future Git production push can replace a manually published version; disable automatic publishing during recovery/trials if needed.
5. After Netlify reports a successful production publish, run:

   ```sh
   node scripts/check-deployment.mjs https://ma-phone-launcher.netlify.app
   ```

   It requires HTTPS, exact build bytes for every public application asset, privacy headers and 404s for archive/docs/tests/QA/private paths. It follows no call links and uploads no contacts. A successful build or a host's ready flag alone is not this acceptance check.
6. Record the source commit, production deploy ID, stable origin, check results and helper/date. Open the stable origin without signing in and confirm no password/account screen. Keep this hostname stable; local profiles are origin-specific. Avoid custom domains/certificates unless someone accepts responsibility for renewals.
7. Only then install on Ma's actual iPhone and import the checked profile there. Complete IPHONE_SETUP.md including Wi-Fi/cellular, reopening/restart, ordinary outbound/inbound calls, handoffs, VoiceOver/text size and native fallback. Publication is **deployment readiness**, not device acceptance. No 000 test calls.

## Rollback and recovery

A failed Netlify deployment leaves the previous live version in place. For a bad published update, fix forward: revert the specific later regression, rebuild and publish a new clean release to the **same** project/origin. Do not revert the privacy hardening or publish the original/main/archive: they would re-expose numbers or bypass checks.

If a previously checked sanitised shell is retained, it can be uploaded as a fresh deployment to that same project. Keep its profile format compatible; no migration is currently needed for profile v1. A source rollback does not restore a device's private profile, and device restoration does not change the hosted code. Reimport the helper-held private backup inside the installed app after any storage loss. Avoid changing the hostname during recovery.

While recovering, use the untouched native Phone favourites/contacts and Emergency SOS, or the still-working previous native shortcuts. Do not delete/recreate the phone layout first. Do not lock Ma into Guided Access: Apple documents emergency limitations. Do not test-call 000.

## Sources checked

- Netlify file configuration and precedence: https://docs.netlify.com/build/configure-builds/file-based-configuration/
- Netlify visitor protection and session gates: https://docs.netlify.com/manage/security/secure-access-to-sites/password-protection/
- Netlify atomic deployments and publishing controls: https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/
- GitHub Pages public-site warning: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- GitHub sensitive-data history removal and remaining copies: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
- Browser storage origin scope and private-browsing limits: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- Native calls with Assistive Access: https://support.apple.com/en-ie/guide/assistive-access-iphone/devcd5016d312/26/ios/26
