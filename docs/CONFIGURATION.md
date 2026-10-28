# Configure with Ma and a trusted helper

`config.json` is the single editable source. Configuration is changed in the repository and deployed, not by touching Ma's screen. There is intentionally no browser admin form or PIN presented as security. Do not store credentials, private tokens or medical information here: this repository is public and all client files are readable.

## Confirm before enabling

1. On Ma's current phone, open the working shortcut/contact and inspect its actual destination. Compare with a trusted current contact record. Confirm the intended person, preferred displayed label, number and action with the helper. A GitHub label is not proof of identity.
2. Keep the existing `phone` unless the actual check establishes a correction. Numbers use `+` and 8–15 digits, with no spaces or extension. The four repository values are preserved without modification. Do not treat CALL MIMI as MIA without confirmation.
3. Set `verified` to the boolean `true` and `verifiedOn` to the actual local date of that check, `YYYY-MM-DD`. Do not copy the artificial date from a QA fixture. Missing/false/string flags, invalid/future dates and unsupported destinations remain inactive.
4. Make a supervised ordinary call to each intended contact on Ma's phone, with the recipient expecting it. Check recipient, audio, hang-up, incoming calls, and returning to MA Phone. Revert `verified` to false if uncertain. Do not call 000 to test.

The date is an audit aid rather than automatic proof or expiry. A wrong but well-formed verified number can still be wrong. Recheck after any destination change.

## Supplementary items

ABC 702, 2GB, TV GUIDE and the two MA GOOGLE labels are grounded in the earlier setup evidence, but their actual destinations and functions remain unverified. URLs stay null. In particular, do not assume MA GOOGLE means a search page rather than a voice or Shortcut action. The two identical labels need clarification with Ma before both are enabled.

For an ordinary website, inspect the current shortcut and set its exact confirmed HTTPS URL, `verified:true` and the real `verifiedOn`. Test it on the phone. HTTP, script/data URLs, credentials in URLs and arbitrary custom schemes are rejected. If the existing function needs Shortcuts, Files, a native app, or a non-HTTPS scheme, keep it native until its intended behavior is confirmed and explicitly implemented; do not replace it with a generic guessed website.

The earlier podcast player is not linked because its exact current URL is missing. No new personal labels or placeholder phone numbers were added. Screen IDs and item IDs must stay unique; there are exactly four main contacts and two supplementary screens, with up to six items per supplementary screen.

## Photographs and colours

There are no verified photographs in this implementation. Initials are derived from existing labels and are not portraits. To use a confirmed familiar picture, put an approved JPG/PNG/WebP under `assets/` with a simple filename such as `assets/adam.jpg` and set that item's `photo`. Only those local paths are accepted; a missing/broken picture falls back to its existing label and initial. Photos in this public repository become public: get permission or use an appropriate private hosting arrangement before adding private pictures.

The palette keys are green, pink, purple, blue, yellow and peach. Preserve recognisable established choices where possible; dark text provides AA contrast against every palette colour. Text and shape identify actions as well as colour. Do not reorder tiles casually: config array order determines their placement.

## Publish and rollback

Run the checks, normal build, and publish only `dist/` through the repository's chosen host. Keep configuration and code deployed together; `config.json` requests `no-store`, and no service worker/local override is used. Host/CDN behavior still needs checking on the deployment. Run the on-phone acceptance checklist before removing any old shortcuts. Restore the previous deployment or revert the commit if necessary; do not rebuild the phone layout as a first recovery step.
