# EU Declaration of Conformity — {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}}

**Manufacturer (Legal Entity):** {{LEGAL_ENTITY_NAME}}
{{#LEGAL_ENTITY_ADDRESS}}
**Address:** {{LEGAL_ENTITY_ADDRESS}}
{{/LEGAL_ENTITY_ADDRESS}}
{{#HAS_EU_REP}}
**EU Authorized Representative:** {{EU_REPRESENTATIVE_CONTACT}}
{{/HAS_EU_REP}}
**Contact (regulatory):** {{LEGAL_EMAIL}}

## Product Identification

- **Product name:** {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}} (the “{{PRODUCT_TERM}}”)
  {{#SHOW_TECH_IDENTIFIERS}}
- **Technical identifiers:** `{{PACKAGE_NAME}}`
  {{/SHOW_TECH_IDENTIFIERS}}
- **Type / model:** {{PRODUCT_MODEL_CODE}} (product family of {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}})
- **Version covered by this Declaration:** {{CONFORMITY_SERIES}} (baseline {{BASELINE_VERSION}} dated {{BASELINE_EFFECTIVE_DATE}}). Subsequent **minor/patch** updates within this series are **covered** by this Declaration **provided** they do **not introduce substantial changes** that could adversely affect compliance with essential requirements. Build identifiers (e.g., commit/tag) for released binaries are recorded in the **Technical Documentation** (Annex A).
- **Intended use:** Standalone software (product with digital elements) operating **offline** by default; no personal-data processing by default.

**Versioning / Series covered by this Declaration.**

- Conformity series: {{CONFORMITY_SERIES}} (baseline {{BASELINE_VERSION}} dated {{BASELINE_EFFECTIVE_DATE}};.
- Subsequent minor/patch releases within this series are covered provided they do not introduce substantial changes affecting conformity.
- Internal pre-release builds prior to {{BASELINE_VERSION}} were not placed on the market and are outside the scope of this Declaration.

## Applicable Union Legislation

The {{PRODUCT_TERM}} has been assessed for conformity with the **EU Cyber Resilience Act (CRA)** and applicable Union legislation for products with digital elements. Where applicable, conformity is demonstrated by internal control and/or third-party assessment as indicated below.

{{#HAS_NOTIFIED_BODY}}

## Notified Body (if applicable)

- **Name/Number:** {{NOTIFIED_BODY_NAME}} (NB {{NOTIFIED_BODY_NUMBER}})
- **Activity:** {{NOTIFIED_BODY_ACTIVITY}} (e.g., conformity assessment under the CRA for {{CRITICALITY_CLASS}})
- **Certificate/Opinion:** {{NOTIFIED_BODY_CERT_REF}}
  {{/HAS_NOTIFIED_BODY}}

## Harmonised Standards / Common Specifications (where applied)

{{#HARMONISED_STANDARDS_LIST}}

- {{.}}
  {{/HARMONISED_STANDARDS_LIST}}
  {{^HARMONISED_STANDARDS_LIST}}
  _None applied; conformity established via internal control and documentation referenced in the Technical File._
  {{/HARMONISED_STANDARDS_LIST}}

## Essential Requirements — Summary of Compliance

- **Secure development & vulnerability handling:** Implemented as described in `SECURITY` and **Incident Response / Vulnerability Handling Plan**.
- **Security support period:** The shorter of (i) the declared expected lifetime for the relevant major version (**{{SECURITY_SUPPORT_PERIOD_MONTH}} months**) and (ii) **five (5) years** from its initial commercial release.
- **Updates:** Delivered via distribution channels in use from time to time; no specific cadence guaranteed.
- **Personal data protection:** No collection by default; if optional features are enabled, processing follows the **Privacy Policy**.
- **Accessibility (EAA):** Information on accessibility and contact: {{ACCESSIBILITY_CONTACT}}.

## CE Marking

The manufacturer declares that the {{PRODUCT_TERM}} conforms to the applicable requirements. The **CE marking** is affixed {{CE_MARK_PLACEMENT}}.

> Examples: “in-product Legal/About screen and documentation”; “on physical media/packaging where used”.

## Technical Documentation

Technical Documentation is maintained by the manufacturer and will be made available to competent authorities upon request.

**Place/Date:**

**Name/Function:**

**Signature:**
