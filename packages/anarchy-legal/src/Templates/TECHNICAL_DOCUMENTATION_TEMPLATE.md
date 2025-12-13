# Technical Documentation (Technical File) — {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}}

**Manufacturer:** {{LEGAL_ENTITY_NAME}}

**Contacts:** Reg./Legal {{LEGAL_EMAIL}} · Security {{SECURITY_EMAIL}}

**Product:** {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}} (the “{{PRODUCT_TERM}}”)

**Conformity series:** {{CONFORMITY_SERIES}} (baseline **{{BASELINE_VERSION}}**, dated **{{BASELINE_EFFECTIVE_DATE}}**)

**Confidentiality:** Internal; provided to competent authorities upon request.

> This index points to the core artifacts that substantiate CRA conformity. The {{PRODUCT_TERM}} works **offline by default** and **does not** process personal data by default. Where optional online/diagnostic features exist, see **PRIVACY**.

---

## A. Product description (what it is)

- **Intended use / environment:** non-safety-critical, personal use; standalone software (product with digital elements).
- **Architecture overview:** high-level diagrams/notes (optional).
- **Distribution channels:** as described in **INSTRUCTIONS** (e.g., installers, archives, store listings).
- **Dependencies (runtime):** summarized; **full list** → **SBOM**.

## B. Conformity assessment route

- **Route:** internal control (no fixed cadence of assessments unless required).
  {{#HAS_NOTIFIED_BODY}}
- **Notified Body:** {{NOTIFIED_BODY_NAME}} (NB {{NOTIFIED_BODY_NUMBER}}) — {{NOTIFIED_BODY_CERT_REF}}
  {{/HAS_NOTIFIED_BODY}}

## C. Essential requirements (CRA) — evidence map

- **Secure development & change control:** see **SECURITY** (CVD inbox {{SECURITY_EMAIL}}), repo policies, dependency pinning/signing (short note).
- **Vulnerability handling & updates:** see **SECURITY** (delivery via distribution channels; **no SLA/cadence**).
- **Default configuration / hardening:** minimal permissions; sandboxing/OS-policies where applicable (short note).
- **Data protection by design/default:** **no personal data by default**; optional features/diagnostics → **PRIVACY** (DPIA/ROPA only if such features are enabled).
- **Accessibility (EAA):** basic info & contact {{ACCESSIBILITY_CONTACT}} (or “N/A”).
- **Security support period:** as declared in **SUPPORT.md** (“Support Period Policy (CRA)”): the **shorter** of (i) the **declared expected lifetime** per **major version** and (ii) **five (5) years** from the initial commercial release. See **SECURITY** for update delivery.

## D. Risk assessment (summary)

- **Threat model / attack surface:** short summary (offline, local execution; main vectors: supply chain, integrity of bundles).
- **Third-party components risk:** addressed via **SBOM** + updates.
- **Residual risks / limitations:** brief list (e.g., modding at user’s risk; untrusted plugins not supported).

## E. Testing & verification (summary)

- **Security testing performed:** SAST/DAST/manual review (scope + one-line result).
- **Compat/functional checks:** smoke tests on supported platforms (see **INSTRUCTIONS**).
- **Pen-test:** N/A or short note (if ever done, attach brief).

## F. SBOM

- **Location & format:** {{SBOM_LOCATION}} (e.g., `./legal/sbom/`, CycloneDX JSON).
- **Generation:** brief (tool, pipeline step).

## G. Labels, notices & marking

- **CE Marking:** see **INSTRUCTIONS** (section “CE Marking”); image `ce-mark.png`.
- **Legal docs packaged offline:** `EULA.*`, `PRIVACY.*`, `SECURITY.*`, `DISCLAIMER.*`, `NOTICE.*`, `THIRD_PARTY_LICENSES.*`, `LICENSE`, `EU_DECLARATION_OF_CONFORMITY.pdf`, `INSTRUCTIONS.*`.

## H. Lifecycle & post-market (summary)

- **End-of-support:** how users are notified (e.g., release notes / in-product notice, if present).
- **Post-market monitoring:** mailbox intake; watch store feedback/issue tracker; criteria of “substantial change” (one-liner).
- **Export controls:** see **EULA/DISCLAIMER** (short pointer).

## I. Document history

- **Changelog / release notes:** see `CHANGELOG`.
- **Tech File updates:** log kept internally (date/editor/summary); available on request.
