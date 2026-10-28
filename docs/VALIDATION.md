# Validation — 28 October 2026

These results apply to repository code and the cloud Chrome browser. No iPhone was connected, installed, configured or used for these checks. The branch is a reviewable implementation, not a claim of a live update.

## Original implementation checks — retained historical evidence

`node --check app.js`, `node --test tests/safety.test.cjs` (9 passing tests), and `git diff --check` passed. At that original tested revision, both archived originals matched the source at commit `638a36239bda7b7f63615e346c951778e6544647` byte-for-byte. The later privacy change redacts the HTML archive; that exact-match claim is historical, not a claim about the current archive. Existing icons were left unchanged. The normal static build succeeds without packages.

The tests cover preserved numbers/colours, unverified destinations, malformed/future dates, unsafe URL schemes, local photo paths, duplicate IDs, six-tile navigation, resume/history recovery, cancellation/focus, rapid tap and repeat-launch guards, configuration failure, AA colour contrast and enabled native zoom. The DOM harness exercises application events; it is not an iOS browser emulator.

## Browser viewport checks

The browser loaded the actual launcher in same-origin iframes of the dimensions below. Each size was measured at 100% and 200% root text size. This approximates CSS layout at those sizes; it does not simulate actual Dynamic Type, Safari chrome, zoom physics, notches or Home indicators.

| CSS viewport | Text | Horizontal overflow | Targets below 44 px | Expected behavior |
| --- | --- | --- | --- | --- |
| 320 × 568 | 100% | None | 0 | All six tiles above emergency bar |
| 375 × 548 | 100% | None | 0 | All six tiles above emergency bar |
| 375 × 667 | 100% | None | 0 | All six tiles above emergency bar |
| 390 × 844 | 100% | None | 0 | All six tiles above emergency bar |
| 430 × 932 | 100% | None | 0 | All six tiles above emergency bar |
| 667 × 375 | 100% | None | 0 | Vertical scrolling; HOME and emergency remain available |
| 320 × 568 | 200% | None | 0 | Vertical scrolling; HOME and emergency remain available |
| 375 × 548 | 200% | None | 0 | Vertical scrolling; HOME and emergency remain available |
| 375 × 667 | 200% | None | 0 | Vertical scrolling; HOME and emergency remain available |
| 390 × 844 | 200% | None | 0 | Vertical scrolling; HOME and emergency remain available |
| 430 × 932 | 200% | None | 0 | Vertical scrolling; HOME and emergency remain available |
| 667 × 375 | 200% | None | 0 | Vertical scrolling; HOME and emergency remain available |

Normal portrait view shows all six tiles without scrolling to reach them. Some compact views retain a small amount of blank scroll space below content to protect the footer. At enlarged text and in landscape, content scrolls rather than truncating. Larger text reflows into a single tile column on supporting browsers. Labels are not made small to force everything onto one screen.

Manually checked in the browser: both supplementary screens; HOME from each; unverified call setup panel with no call link; cancel and focus return; emergency confirmation showing `tel:000` without activating it; keyboard focus wrapping and Escape; verified fixture exposing the preserved contact URI; external HTTPS fixture with a separate target/no opener; invalid and missing configuration messages; navigating More and returning HOME at 320 × 568 with 200% text. No actual contact call, emergency call or external site action was triggered.

Automated tests cover rapid repeats and history/visibility handlers. Physical accidental taps, long-press behavior and iOS app switching still need a phone trial. No axe/VoiceOver audit or WebKit/device certification is claimed.

![Simulated main screen, pending verification](main-preview.jpg)

Full QA screenshot: [ma-phone-main-20261028.jpg](ma-phone-main-20261028.jpg). Raw measurements: [viewport-results.json](viewport-results.json).

## Still required on Ma’s phone

Model/iOS identification, current shortcut/contact verification, approved photographs and final labels, deployed URL/version, Safari install, VoiceOver, pinch/text settings, safe areas, native Phone/Safari handoff and return, incoming/outgoing ordinary calls, offline/native fallback, restart, and the native-protection trial. Follow [IPHONE_SETUP.md](IPHONE_SETUP.md). All remain pending.

A website cannot lock the native Home Screen. Guided Access is not recommended as an everyday solution because of its single-app and emergency restrictions. Native controls are assessed in the setup guide, with Apple sources.

## Privacy hardening addendum — 28 October 2026

The original nine-test result and prior viewport evidence above remain historical evidence for commit `10ee6072bff5149713f17ea55ebc0eeea96e69f6`; they were not deleted or replaced by claims about a phone. The current HTML archive is deliberately redacted, so the historical byte-for-byte/archive-number assertion no longer describes it. Its manifest and all existing icon bytes remain unchanged.

Current local verification passed:

- JavaScript syntax checks for app and live-deployment checker.
- **16 Node tests**: the nine original safety scenarios retained (the first now asserts preserved labels/colours and number redaction; verified fixtures use a non-routable QA value), five private-profile/storage/import scenarios and two publication tests.
- The helper import tests cover acknowledgement, file/shape/ordering/size rejection, destination disabling, failed storage/replacement, reload profile selection and preserving the setup panel across file-picker/resume events.
- Normal production build succeeds, removes QA output and publishes an exact 11-file allowlist. The public config is blank; no archive/docs/tests/private profile is included. A non-blank template is rejected. Current source scanning is preventive, not a historical/binary/OCR audit.
- `netlify.toml` parses correctly: Node 24, the full test/build command and `dist` publish directory. The included `_headers` matches the intended manual/Git deployment policy. This is checked-in configuration verification, not evidence of effective response headers at an unpublished origin.
- Whitespace checks pass. The pre-change nine-test baseline passed before edits.

Cloud Chrome rendered the blank six-tile shell and the helper panel. A real browser file-chooser/import attempt was interrupted; it is **not counted as an end-to-end browser import pass**. The earlier six-size/200% viewport results were preserved, not rerun or recertified for this privacy revision. Browser storage/picker behaviour in an installed iOS app remains a device acceptance gate.

The Netlify connection confirmed a new empty `ma-phone-launcher` project, site ID `058897df-30ad-4a38-b267-88f8d49db380`, with no password/team-login requirement and no reviewed published deploy. Dashboard publishing requires sign-in, and the connected plugin does not expose a file-upload deployment operation. No production build upload or successful live acceptance is claimed.

A read-only check against older `https://callma.netlify.app` successfully reached the host but failed the reviewed-build comparison at `index.html`. Additional HTML inspection found five telephone links and three of the four prior draft values. `macallme` returned one telephone link and no match to those four values; that is not a complete personal-data audit. No telephone link was activated. Neither old site was changed.

| Gate | Status |
| --- | --- |
| Current code tests / normal production build / file hosting configuration | Passed locally |
| New stable Netlify project | Created; reviewed release unpublished |
| Effective production bytes, HTTPS, headers and excluded-path 404s | Pending publication and `scripts/check-deployment.mjs` |
| Existing PR | Remains open/draft; updated in place without rewriting history |
| Main/history visibility and obsolete-host containment | Still outstanding; no claim of removal |
| Contact/URL verification and private-profile preparation | Pending trusted helper check |
| Installation, profile persistence, native calling/handoffs and accessibility on Ma's actual iPhone | Pending; no device connected |
| Existing 29 October installation reminder | Unchanged; no duplicate created |

The installation, independent native Phone/Messages/SOS fallback and privacy-safe recovery steps are in IPHONE_SETUP.md and PRIVACY_AND_HOSTING.md. No test call to 000 has been placed or requested.
