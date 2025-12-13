# Technical Documentation (Technical File) — {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}}

**Maintained by:** {{LEGAL_ENTITY_NAME}} · **Contact:** {{LEGAL_EMAIL}} / {{SECURITY_EMAIL}}
**Product:** {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}} ({{PRODUCT_TERM}}) — Version {{PRODUCT_VERSION}}
**Storage location:** {{TECH_DOC_LOCATION}} · **Confidentiality:** Internal; provided to competent authorities upon request.

> This index enumerates the artifacts comprising the Technical File for CRA conformity. Sections can be separate files or folders referenced here.

## A. Product Description

- **Intended use / environment:** {{INTENDED_USE}}
- **Architecture overview:** {{ARCHITECTURE_SUMMARY}} (include diagrams if available)
- **Distribution channels:** {{DISTRIBUTION_CHANNELS_LIST}}
- **Dependencies (runtime):** summarized; full list in **SBOM**.

## B. Conformity Assessment Route

- **Route:** {{CONFORMITY_ASSESSMENT_ROUTE}} (e.g., internal control / third-party assessment)
  {{#HAS_NOTIFIED_BODY}}
- **Notified Body:** {{NOTIFIED_BODY_NAME}} (NB {{NOTIFIED_BODY_NUMBER}}); activity/certificate: {{NOTIFIED_BODY_CERT_REF}}
  {{/HAS_NOTIFIED_BODY}}

## C. Essential Requirements Mapping (CRA)

Provide evidence/artifacts per requirement:

- **Secure development / change control:** {{SECURE_DEV_PRACTICES}} (coding standards, code review, CI, supply-chain controls)
- **Vulnerability handling:** see **Incident Response / Vulnerability Handling Plan** and `SECURITY`
- **Security updates policy:** {{UPDATE_POLICY_SUMMARY}}
- **Cryptography use (if any):** {{CRYPTO_USAGE}} (algorithms, libraries, key handling)
- **Hardening & configuration defaults:** {{HARDENING_DEFAULTS}}
- **Data protection by design & default:** **No personal data by default**; if optional features added, link DPIA/records here: {{DPIA_LINK}}
- **Logging/diagnostics (local):** {{LOGGING_SUMMARY}} (no personal data by default)
- **Accessibility information (EAA):** {{ACCESSIBILITY_MEASURES}}

## D. Risk Assessment & Mitigations

- **Threat model / attack surface:** {{THREAT_MODEL_REF}}
- **Known limitations / residual risks:** {{RESIDUAL_RISKS}}
- **Third-party component risks:** {{THIRD_PARTY_RISK_SUMMARY}} (ties to SBOM)

## E. Testing & Verification

- **Security testing evidence:** {{SECURITY_TESTS}} (SAST/DAST/manual review; scope and summary)
- **Functional tests summary:** {{FUNC_TESTS}}
- **Penetration testing (if conducted):** {{PEN_TEST_SUMMARY}}

## F. SBOM

- **Format & location:** {{SBOM_FORMAT}} at {{SBOM_LOCATION}}
- **Generation process:** {{SBOM_PROCESS}}

## G. Labels & Markings

- **CE Marking placement:** {{CE_MARK_PLACEMENT}}
- **Legal notices included:** `EULA`, `PRIVACY`, `SECURITY`, `DISCLAIMER`, `NOTICE/THIRD_PARTY_LICENSES`

## H. Lifecycle & Support

- **Security support period:** The shorter of **{{SECURITY_SUPPORT_PERIOD_MONTH}} months** for the major version and **five (5) years)** from initial commercial release.
- **End-of-support procedure:** {{EOS_PROCEDURE}} (how users are notified; archival notes)

## I. Records & Change History

- **Version control references / release notes:** {{RELEASE_NOTES_REF}}
- **Document revision log:** {{TECH_DOC_CHANGELOG_REF}}

> Cross-references: EU Declaration of Conformity; Instructions for Use; Incident Response / Vulnerability Handling Plan.
