# Technical Documentation (Technical File) — TBD until market release

**Manufacturer:** Sergei Aleksandrovich Panfilov

**Contacts:** Reg./Legal TBD until market release · Security TBD until market release

**Product:** TBD until market release (the “Software”)

**Conformity series:** TBD until market release (2.0.0) (baseline **TBD until market release**, dated **TBD until market release**)

**Confidentiality:** Internal; provided to competent authorities upon request.

> This index points to the core artifacts that substantiate CRA conformity. The Software works **offline by default** and **does not** process personal data by default. Where optional online/diagnostic features exist, see **PRIVACY**.

---

## A. Product description (what it is)

- **Intended use / environment:** non-safety-critical, personal use; standalone software (product with digital elements).
- **Architecture overview:** high-level diagrams/notes (optional).
- **Distribution channels:** as described in **INSTRUCTIONS** (e.g., installers, archives, store listings).
- **Dependencies (runtime):** summarized; **full list** → **SBOM**.

## B. Conformity assessment route

- **Route:** internal control (no fixed cadence of assessments unless required).

## C. Essential requirements (CRA) — evidence map

- **Secure development & change control:** see **SECURITY** (contact as listed in `./legal/SECURITY.*`), repo policies, dependency pinning/signing (short note).
- **Vulnerability handling & updates:** see **SECURITY** (delivery via distribution channels; **no SLA/cadence**).
- **Default configuration / hardening:** minimal permissions; sandboxing/OS-policies where applicable (short note).
- **Data protection by design/default:** **no personal data by default**; optional features/diagnostics → **PRIVACY** (DPIA/ROPA only if such features are enabled).
- **Accessibility (EAA):** basic info & contact **TBD until market release** (or “N/A”).
- **Security support period:** as declared in **SUPPORT.md** (Support Period Policy): the **shorter** of the **declared expected lifetime** per **major version** and **five (5) years** from initial commercial release.

## D. Risk assessment (summary)

- **Threat model / attack surface:** offline, local execution; main vectors: supply chain, integrity of bundles, update mechanism.
- **Third-party components risk:** addressed via **SBOM** + updates.
- **Residual risks / limitations:** modding at user’s risk; untrusted plugins not supported; execution on outdated browsers/OS may reduce protections.

## E. Testing & verification (summary)

- **Security testing performed:** SAST/DAST/manual review (scope + one-line result).
- **Compat/functional checks:** smoke tests on supported platforms (see **INSTRUCTIONS**).
- **Pen-test:** N/A or short note (if ever done, attach brief).

## F. SBOM

- **Location & format:** **`./legal/sbom/` (CycloneDX JSON)**.
- **Generation:** brief (tool, pipeline step).

## G. Labels, notices & marking

- **CE Marking:** see **INSTRUCTIONS** (section “CE Marking”); image `ce-mark.png`.
- **Legal docs packaged offline:** `EULA.*`, `PRIVACY.*`, `SECURITY.*`, `DISCLAIMER.*`, `NOTICE.*`, `THIRD_PARTY_LICENSES.*`, `LICENSE`, `EU_DECLARATION_OF_CONFORMITY.pdf`, `INSTRUCTIONS.*`.

## H. Lifecycle & post-market (summary)

- **End-of-support:** users notified via release notes and/or in-product notice (if present).
- **Post-market monitoring:** intake via Security/Support mailboxes; watch store feedback/issue tracker.
- **Substantial change (screening):** change that impacts **attack surface**, **cryptography**, **update mechanism**, **network capabilities**, or **data processing** may require reassessment.
- **Export controls:** see **EULA/DISCLAIMER** (short pointer).

## I. Document history

- **Changelog / release notes:** see `CHANGELOG`.
- **Tech File updates:** log kept internally (date/editor/summary); available on request.
