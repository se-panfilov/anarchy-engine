# Must be done before the commercial release of the app.

1. Convert `./compliance/EU_DECLARATION_OF_CONFORMITY.md` to `./legal/dd-mm-yyyy/EU_DECLARATION_OF_CONFORMITY.pdf` and sign it.
2. Add CE-mark to the product's Legal/About screen and documentation (e.g. INSTRUCTIONS)

In the root folder (every app):

- README.md
- LICENSE
- CHANGELOG.md
- NOTICE

**in the ./legal folder**:

- EULA.md (+ archive/2025-08-21_EULA.pdf on every release)
- PRIVACY.md (+ archive/2025-08-21_Privacy.pdf).
- SECURITY.md
- DISCLAIMER.md
- EU_DECLARATION_OF_CONFORMITY.pdf (PDF!!!!)
- INSTRUCTIONS.md
- SUPPORT.md
- NOTICE
- THIRD_PARTY_LICENSES
- ce-mark.png
- sbom/cyclonedx.json

**in the ./compliance folder**:

- EU_DECLARATION_OF_CONFORMITY.md
- TECHNICAL_DOCUMENTATION.md
- VULN_HANDLING.md

Other:
/.well-known/security.txt (a copy of CVD from SECURITY)
