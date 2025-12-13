# Technical Documentation (Technical File) — {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}}

**Maintained by:** {{LEGAL_ENTITY_NAME}}
**Contacts:** Reg./Legal {{LEGAL_EMAIL}} · Security {{SECURITY_EMAIL}}
**Product:** {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}} (the “{{PRODUCT_TERM}}”)
**Conformity series:** {{CONFORMITY_SERIES}} (baseline **{{BASELINE_VERSION}}**, dated **{{BASELINE_EFFECTIVE_DATE}}**)
**Confidentiality:** Internal; provided to competent authorities upon request.

> This index enumerates the artifacts comprising the **Technical File** for CRA conformity and related obligations. Sections may be separate files/folders referenced here. Unless noted, the {{PRODUCT_TERM}} operates **offline** by default and does **not** process personal data by default.

---

## A. Release & Build Registry (Annex A)

Records referenced by the EU DoC.

- **Baseline:** {{BASELINE_VERSION}} ({{BASELINE_EFFECTIVE_DATE}}) — commit/tag: {{BASELINE_COMMIT_OR_TAG}}
- **Covered minor/patch releases** (within {{CONFORMITY_SERIES}} not introducing substantial change):
  | Version | Date | Commit/Tag | Distribution channel(s) | Checksums / signatures |
  |--------|------|------------|--------------------------|------------------------|
  | | | | | |

- **Reproducibility notes:** how to rebuild from source (toolchain/hash), SBOM link, CI pipeline reference.

---

## B. Product Description

- **Intended use / environment:** {{INTENDED_USE}} (non-safety-critical; personal use).
- **Architecture overview:** {{ARCHITECTURE_SUMMARY}} (diagrams if available).
- **Distribution channels:** {{DISTRIBUTION_CHANNELS_LIST}}.
- **Runtime dependencies (summary):** core libs/runtimes; **full list** → SBOM (Section F).

---

## C. Conformity Assessment Route

- **Route:** {{CONFORMITY_ASSESSMENT_ROUTE}} (e.g., internal control / third-party assessment).
  {{#HAS_NOTIFIED_BODY}}
- **Notified Body:** {{NOTIFIED_BODY_NAME}} (NB {{NOTIFIED_BODY_NUMBER}}) — activity/certificate: {{NOTIFIED_BODY_CERT_REF}}
  {{/HAS_NOTIFIED_BODY}}

---

## D. CRA Essential Requirements Mapping

Evidence/artifacts per requirement (link to files/locations):

- **Secure development & change control:** {{SECURE_DEV_PRACTICES}} (coding standards, code review, CI, dependency pinning, signing).
- **Vulnerability handling:** `INCIDENT_RESPONSE.md` / `SECURITY.*` (CVD inbox {{SECURITY_EMAIL}}; intake/triage, severity, disclosure).
- **Security updates policy:** {{UPDATE_POLICY_SUMMARY}} (delivery via distribution channels; no fixed cadence).
- **Default configuration & hardening:** {{HARDENING_DEFAULTS}} (least privilege, sandboxing, permissions).
- **Logging/diagnostics (local):** {{LOGGING_SUMMARY}} (no personal data by default).
- **Data protection by design/by default:** **No personal data by default**; if optional online/crash-reports enabled → reference **PRIVACY.\*** and DPIA/ROPA (Annex D).
- **Accessibility (EAA):** {{ACCESSIBILITY_MEASURES}}; contact: {{ACCESSIBILITY_CONTACT}}.
- **Security support period:** shorter of **{{SECURITY_SUPPORT_PERIOD_MONTH}} months (major)** or **5 years** from initial commercial release (see `SECURITY.*`).

---

## E. Risk Assessment & Mitigations

- **Threat model / attack surface:** {{THREAT_MODEL_REF}} (assets, trust boundaries).
- **Third-party component risks:** {{THIRD_PARTY_RISK_SUMMARY}} (ties to SBOM & update cadence).
- **Residual risks / known limitations:** {{RESIDUAL_RISKS}} (and communicated user guidance).

---

## F. Testing & Verification

- **Security testing:** {{SECURITY_TESTS}} (SAST/DAST/manual review scope and key findings/closure).
- **Functional/compat tests:** {{FUNC_TESTS}} (platforms/browsers/OSes).
- **Penetration testing (if any):** {{PEN_TEST_SUMMARY}} (scope/date/provider), or **N/A**.

---

## G. SBOM

- **Format & location:** {{SBOM_FORMAT}} at {{SBOM_LOCATION}} (e.g., CycloneDX JSON in `sbom/`).
- **Generation process:** {{SBOM_PROCESS}} (tool/version; pipeline step; signature, if any).

---

## H. Labels, Notices & Markings

- **CE Marking placement:** see `INSTRUCTIONS.*` (section “CE Marking”); image at `ce-mark.png`.
- **Legal notices packaged offline:** `EULA.*`, `PRIVACY.*`, `SECURITY.*`, `DISCLAIMER.*`, `NOTICE.*`, `THIRD_PARTY_LICENSES.*`, `LICENSE`, `EU_DECLARATION_OF_CONFORMITY.pdf`, `INSTRUCTIONS.*`.

---

## I. Lifecycle, Support & Post-Market Monitoring

- **Security support period:** as above ({{SECURITY_SUPPORT_PERIOD_MONTH}} months or ≤5 years).
- **End-of-support (EoS) procedure:** {{EOS_PROCEDURE}} (how users are notified; archival/read-only status).
- **Post-market monitoring:** {{POST_MARKET_MONITORING}} (channels watched; intake from users/researchers; criteria for “substantial change” affecting conformity).
- **Export controls & sanctions:** reference **DISCLAIMER/EULA**; classification notes (if cryptography): {{EXPORT_CLASSIFICATION}}.

---

## J. Privacy & Store Disclosures (matrix)

> Only relevant if optional online features or crash-reporting are enabled.

- **PRIVACY alignment:** `PRIVACY.*` (no data by default; opt-in diagnostics if enabled).
- **Records:** DPIA/ROPA link or statement → **Annex D**.
- **Store disclosure worksheet:** Apple Privacy Nutrition Label / Google Play Data Safety mapping (**expected status**: “No data collected”; diagnostics = **not linked**, **not for ads/tracking** when opt-in).
  Worksheet location: {{STORE_DISCLOSURES_WORKSHEET}} (optional).

---

## K. Version Control & Document History

- **Release notes / changelogs:** {{RELEASE_NOTES_REF}} (e.g., `CHANGELOG`).
- **Tech File revision log:** {{TECH_DOC_CHANGELOG_REF}} (doc version, date, editor, summary of changes).

---

### Annexes (evidence index)

- **Annex A — Release & Build Registry:** (this document’s Section A — table is the canonical register).
- **Annex B — Test Evidence Pack:** SAST/DAST reports, pen-test summaries, fix verification.
- **Annex C — SBOM Artifacts:** generated SBOM(s) and signatures.
- **Annex D — DPIA/ROPA (if applicable):** {{DPIA_LINK}} / {{ROPA_LINK}} or **N/A** (no processing by default).
- **Annex E — Accessibility Conformance (EAA/WCAG):** {{ACCESSIBILITY_ACR_LINK}} or summary.
- **Annex F — Keys & Signing (if applicable):** code-signing cert refs, package signatures, checksum publication process.
- **Annex G — Incident Response / Vulnerability Handling Plan:** roles, timelines, notification triggers (CVD alignment).
