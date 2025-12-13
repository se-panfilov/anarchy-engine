# Must be done before the commercial release of the app.

## General

1. Convert `./compliance/EU_DECLARATION_OF_CONFORMITY.md` to `./legal/dd-mm-yyyy/EU_DECLARATION_OF_CONFORMITY.pdf` and sign it.
2. Add CE-mark to the product's Legal/About screen
3. For web version add ./well-known/security.txt with the content of `./legal/SECURITY.md` (CVD) to the root of the web server.

## Windows

**What:** Code signing certificate (**OV** or **EV**) + sign `.exe/.msi` with a timestamp

**When:** Before relese/beta. Re-sign on every release

**Keep in:** sertificate/keys — **not in the repository**. Store in OS store/token/HSM or in CI secrets. In the repo keep `docs/release/windows-signing.md` (command `signtool`, URL TSA, contact).

## iOS/macOS

### App Privacy (Privacy Nutrition Label)

**What:** Fill `App Privacy details` form in App Store Connect and `Age Rating` questionnaire.

**When:** Before submitting the app for review.

**Requirements:** URL Privacy Policy.

**Keep in:** `/legal/store-answers/apple-app-privacy.json/md`

**Flow:**: `sign` → `notarize` → `staple`

## Android

### Data safety (App content)

**What:** Fill `Data safety (App content)` and `Content rating (IARC`).

**When:** Before submitting the app for review.

**Requirements:** URL Privacy Policy, fill `Content rating (IARC)` questionnaire.

**Keep in:** `/legal/store-answers/google-data-safety.md`

## Steam

**What:** `Content Survey` and `Review Process`

**When:** Before Steam release.

**Keep in:** ???

## Epic Games Store

**What:** `IARC certificate` in Dev Portal

**When:** Before Epic Games Store release.

**Keep in:** `content-ratings/`

## Checklist

- Legal/About screen with CE mark;
- Legal docs are available via main menu in a game;
- Legal docs are provided with binary
