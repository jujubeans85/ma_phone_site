# MA Phone

Three-screen iPhone launcher: six familiar main tiles (CALL ADAM, CALL CHLO, CALL MIMI, CALL OLI, Radio & TV, More), two supplementary screens, permanent HOME and deliberate confirmations before calls, websites and 000. Existing colours and order are preserved. MIMI has not been renamed or assumed to be MIA.

**Draft implementation; installation and actual-iPhone acceptance remain pending.** Do not remove working native calling or emergency access. No contact has been verified by this repository work. The existing 29 October 2026 installation reminder is unchanged.

## Privacy arrangement

Publish a **public, non-personal shell** over stable HTTPS. Import one helper-prepared private profile **inside the installed app on Ma's iPhone**. Ma needs no password or login during everyday use. The profile is the authoritative device configuration until deliberately replaced; the repository holds a blank template and the application code. There is no server contact database, automatic profile download, analytics, third-party JavaScript, service worker or background sync.

`config.json` now has null destinations and photographs, with verification disabled. Familiar labels, layout, colours and icons remain public. Phone numbers were also redacted from the current archive. **Old Git history, main and earlier deployments have not been erased or made private.** See the [privacy and hosting review](docs/PRIVACY_AND_HOSTING.md) for exposure, alternatives and containment still needed.

Device storage is plaintext to code from the same origin and to someone with device/browser access. Clearing site data, reinstalling, changing origins or storage restrictions can require setup again. A compromised host could serve code that reads the profile. This is data minimisation, not a private vault. Keep a helper-held private backup and independent native Phone/Messages/SOS available. Fresh launcher loads require internet.

## Build and verify

Node 24 recommended; no npm packages or install step.

```sh
node --check app.js
node --test tests/*.test.cjs
node scripts/build.mjs
```

The build checks the public source for literal phone numbers, non-blank destinations and asset photographs, then recreates `dist/` from an explicit allowlist. It excludes archive, tests, QA, docs, private profiles and repository files. The scanner is a preventive gate, not proof of removal from history or images. Never upload the repository root or a QA build.

`netlify.toml` pins the build command and `dist` publish directory. `_headers` travels with manual builds and sets no-store, noindex, no-referrer and a restrictive CSP. These reduce caching, indexing and third-party requests; they do not restrict visitors. Unknown paths must 404; no catch-all rewrite is configured.

For a local Work preview, ignored `.openai/hosting.json` can contain `{"static":{"directory":"dist"}}`; start `sites-preview start <absolute-checkout>`. `node tests/prepare-preview.mjs` makes QA-only fixtures, using a deliberately non-routable number. Rebuild normally afterwards. Never activate call links during browser QA.

After publishing, verify the reviewed build at the permanent origin:

```sh
node scripts/check-deployment.mjs https://ma-phone-launcher.netlify.app
```

This read-only check compares live bytes and headers and checks excluded paths return 404. It does not place calls, import contacts or certify an iPhone installation.

## Configure, install and recover

- [Prepare and verify the private profile](docs/CONFIGURATION.md)
- [Hosting comparison, release steps and rollback](docs/PRIVACY_AND_HOSTING.md)
- [iPhone installation and native safety checklist](docs/IPHONE_SETUP.md)
- [Validation evidence and remaining gates](docs/VALIDATION.md)

The archive is now a redacted historical reference, not an installable fallback. Its manifest and existing icons remain unchanged. Original test evidence is retained with a dated privacy-change addendum. The existing PR stays open and draft; there is no merge or main-branch update as part of this change.
