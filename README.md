# MA Phone

A buildless, three-screen iPhone web launcher. **Development complete; contact verification and installation on Ma's phone are still required.** The current phone's installed launcher, model and iOS version have not been established.

- Main: six fixed tiles — CALL ADAM, CALL CHLO, CALL MIMI, CALL OLI, Radio & TV, More.
- Radio & TV: ABC 702, 2GB, TV GUIDE.
- More: the two existing MA GOOGLE labels, kept as separate unverified slots.
- A separate EMERGENCY 000 control is available on every screen, behind a deliberate confirmation.

The two navigation labels/groupings are implementation choices, not a claim that Ma previously approved that exact arrangement. Existing contact order, labels, destinations and four colours come from the original repository. Recent references to CHLOE/MIA do not establish that MIMI is MIA; no rename has been guessed. No photograph or missing URL has been invented.

## Run and check

Requires Node 18+; no npm dependencies.

```sh
node --check app.js
node --test tests/safety.test.cjs
node scripts/build.mjs
```

Serve `dist/` over HTTPS. For the managed Work preview, create the ignored local `.openai/hosting.json` containing `{"static":{"directory":"dist"}}`, then use `sites-preview start <absolute-checkout>`. To reproduce browser QA, run `node tests/prepare-preview.mjs`, serve `dist/`, and open `/qa/index.html`. **QA fixtures must never be deployed.** The normal build removes them.

The root files also work on a static host at a subpath, with all asset and config paths relative. Publishing the built `dist/` allowlist is preferred so archives/tests/docs are excluded. No new host, deployment workflow or replacement live site is assumed. No changes are made to the existing main branch or a phone by running these checks.

## One source of truth

Edit [config.json](config.json), following [configuration and verification](docs/CONFIGURATION.md). All four old numbers are retained byte-for-byte, with `verified:false`: finding a number in May's source does not verify it today. Pending items show **Needs setup** and have no actionable destination. Enabling a destination requires an explicit boolean `true`, a real verification date and an allowed URL/number. The date records a helper's check; it cannot prove the recipient is correct.

There is no on-phone edit mode, hidden long-press setting, local-storage configuration, service worker, analytics, external font, dependency or duplicate set of individual Home Screen shortcuts. This keeps updates in one repository and avoids stale offline contact caches. Internet is required for a fresh launcher load. Native Phone/Messages/emergency access must stay available independently.

## Recovery and safety

HOME is visible while scrolling. Opening/reopening/resuming the launcher, stale hashes and history recovery all return to Main. External websites open separately after confirmation; returning from Phone/Safari resets Main. The launcher cannot overlay a HOME control on another app: reopen the MA Phone icon to return. The exact iOS handoff requires device testing.

Calls and URLs require separate confirmation, with a 650 ms guard against tap-through and a repeat-launch guard. GO BACK is initially focused. The emergency panel uses the existing Australian `tel:000`; **never place a test call to 000**. Calls have no dependency on a server once handed to Phone, but this website is not an emergency service or a replacement for native SOS.

A website **cannot prevent the deletion, hiding or rearrangement of native iPhone Home Screen pages or its own Home Screen icon**. [The iPhone setup guide](docs/IPHONE_SETUP.md) compares the actual native controls. [Validation](docs/VALIDATION.md) separates automated/browser checks from the remaining on-device checks.

## Preserve / roll back

`archive/index.original.html` and `archive/manifest.original.json` preserve the exact original files at commit `638a36239bda7b7f63615e346c951778e6544647`; existing icons are unchanged. The archive is reference material and bypasses the new verification gate if deliberately run. Do not publish it as Ma's launcher. Revert the feature commit to restore the previous implementation; for an unmerged branch, main is already unchanged. Keep existing shortcuts and photograph their placements until Ma has successfully tried the replacement.
