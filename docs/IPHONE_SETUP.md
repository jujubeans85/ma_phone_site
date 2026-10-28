# Ma's iPhone: install, protect and recover

Prepared 28 October 2026 (Australia/Sydney). No phone settings, Home Screen items or installations were changed during repository development. Model, iOS version, current installed launcher, current destination correctness and device behavior remain unverified.

## Recover before rebuilding

Photograph all current pages and the Dock. Preserve the existing custom pictures and Shortcuts. Record **Settings > General > About > Model Name / iOS Version**.

If a whole page disappears, first turn off the active Focus temporarily and check its chosen Home Screen pages in Settings > Focus. Then touch and hold an empty area of Home Screen, tap the page dots (or Edit > Edit Pages on the installed version), and reselect any unchecked page. Apple documents hiding and restoring pages; a missing page does not prove its apps were deleted. Check App Library and the Shortcuts app before recreating anything. Don't choose Reset Home Screen Layout; it discards the familiar arrangement. [1]

## Install one familiar launcher

1. Finish the contact/URL checks in CONFIGURATION.md. Agree the six tile arrangement with Ma. Keep direct native Phone, Messages and torch access in familiar places; use Control Center/Lock Screen torch where already familiar. Keep native Emergency SOS and Medical ID available. Camera/Photos/Files stay native if Ma needs them; their website equivalents have not been invented.
2. Deploy the reviewed normal `dist/` build to a stable HTTPS address through the chosen host. This branch is not evidence of a deployed website. Do not use the temporary development preview as an installed permanent address.
3. On **Ma's phone**, open that exact address in Safari. Tap Share (or Page Menu > Share), then **Add to Home Screen**. Name it **MA Phone**. If offered, leave **Open as Web App** on, then Add. Open the new icon and check standalone display. [2]
4. Put the one launcher icon in the agreed familiar position. Leave the working old icons available during a trial; photograph the final layout. Practise: open MA Phone, open each supplementary screen, tap HOME, cancel a mistaken call, make an ordinary verified call and reopen MA Phone. Do not test-call 000.
5. Once that trial succeeds, reduce surplus individual shortcuts with Ma's agreement. Keep the repository/config as the source of truth rather than maintaining multiple copied shortcuts.

The website has fixed tile order and no edit controls. **It cannot stop native Home Screen pages or its own icon being moved, hidden or deleted.** HOME inside the website cannot overlay Phone/Safari; return using the MA Phone icon. Fresh loads need internet. Always retain independent native calling/emergency access.

## Which native controls help?

| Control | Practical assessment |
| --- | --- |
| **Screen Time app-deletion restriction** | A useful extra layer against deleting apps; it is **not a Home Screen layout lock** and does not prevent page hiding or icon movement. Do not assume it protects a Safari web-app icon: check the installed version without deleting the working launcher. |
| **Haptic Touch Slow** | Settings > Accessibility > Touch > Haptic Touch (or 3D & Haptic Touch) > Slow. Test the sample image with Ma. This changes touch-and-hold timing and may reduce accidental contextual menus; it is not a lock or a guarantee against jiggle mode. [3] |
| **Assistive Access — recommended supervised trial** | On a compatible iPhone with iOS 17+, Settings > Accessibility > Assistive Access > Set Up. It provides large native app controls and a separate passcode for exit/settings. Choose Grid and add Calls, Messages and needed apps; set trusted contacts and the recovery account. [4] Trial every required function, including how the web launcher is reached: standalone Safari web-app inclusion/integration is **unverified** and is not promised. It may be a better long-term everyday interface than normal Home Screen. |
| **Guided Access — unsuitable as the everyday launcher lock** | It temporarily confines the phone to one app, which conflicts with native Phone/Messages and external web handoffs. Apple says emergency services and Crash Detection are unavailable until the session ends. Reserve it for brief supervised single-app use, with an adult able to exit. [5] |
| **Supervised device management / Home Screen Layout** | Apple's managed layout can prevent users rearranging icons. It requires supervision and management infrastructure; not a website feature or a normal iPhone toggle. Manual supervision is set up before activation on a new/erased phone. This is disproportionate for the first fix; no erase, enrolment or management profile is proposed here. [6] |

For Screen Time, use **Ma's own device settings**, with her agreement and a helper-held recovery method. On versions exposing the traditional menu: Settings > Screen Time > Content & Privacy Restrictions > turn on > iTunes & App Store Purchases (wording varies) > Deleting Apps > Don't Allow. Set/lock Screen Time with a separate passcode and recovery Apple Account. Menu names and availability vary, so check the recorded iOS version; do not create a child account or change Ma's Apple Account to obtain a restriction. Avoid Downtime/app limits or communication restrictions that block essential calls. The iOS 18 Apple guide documents the purchase/deletion restrictions; newer versions must be checked on the phone. [7]

If trialling Assistive Access, add the correct native Calls favorites and check incoming calls from both contacts and other necessary callers. With it active, triple-click Side/Home > Emergency gives access to the emergency keypad without the Assistive Access passcode. Apple notes that SOS via satellite requires exiting Assistive Access and other emergency behavior differs; review that page for the actual phone. Do not place a test emergency call. [8]

For a supervised Guided Access trial only: Settings > Accessibility > Guided Access, set a known passcode/recovery option, open the chosen app, triple-click Side/Home and Start. Leave Touch on. End by using the installed version's button sequence, authenticate, then End (current guidance uses triple-click; iOS 18 or earlier may use double-click for biometric exit). Confirm the helper can exit before handing over the phone. It is not recommended for Ma's normal unsupervised use. [5]

## Actual-phone acceptance — all still pending

- Record model/iOS, exact deployed URL/version and date; check Wi-Fi and cellular load, safe areas, text size, pinch zoom and rotation.
- Ma recognises all six positions and the two supplementary screens; approved photographs and final labels match her expectations.
- Confirm every enabled recipient/URL. Test ordinary outbound/inbound calls, cancel, hang up, Messages, native torch, Safari handoff and reopening MA Phone. No 000 test call.
- Mistaps, rapid repeat taps, long-presses, scroll, back, app switching, lock/unlock, restart and reopening recover predictably. No native shortcut is removed before this passes.
- Use VoiceOver on-device to check names/order, modal announcement, focus, dismissal and HOME. Browser accessibility-tree checks are not a VoiceOver certification.
- With network unavailable, use native Phone/Messages and SOS independently. Don't rely on a website loading in an emergency.
- Practise hidden-page and Focus recovery with the helper. Take a final layout photograph and retain a rollback route.

## Apple sources checked

[1] https://support.apple.com/en-gb/108324 — hide/unhide and reorganise pages.

[2] https://support.apple.com/en-au/guide/iphone/iph42ab2f3a7/ios — add a website to Home Screen.

[3] https://support.apple.com/guide/iphone/iph77bcdd132/ios — touch settings.

[4] https://support.apple.com/en-au/guide/assistive-access-iphone/devcd5016d31/ios — Assistive Access setup and passcode.

[5] https://support.apple.com/en-au/111795 — Guided Access setup, exit and emergency limitations.

[6] https://support.apple.com/guide/deployment-education/common-mdm-settings-eduee8624eef/1/web/1 and https://support.apple.com/en-gb/guide/apple-configurator-mac/apd9e4f64088/2.21/mac/15.7 — managed layout and supervision.

[7] https://support.apple.com/en-au/guide/iphone/iph3ff83f3b1/18.0/ios/18.0 and https://support.apple.com/en-au/126533 — restrictions and Screen Time passcode.

[8] https://support.apple.com/guide/assistive-access-iphone/dev473e94873/ios — differences in emergency, calls and permissions.
