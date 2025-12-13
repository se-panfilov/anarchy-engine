# Incident Response & Vulnerability Handling Plan — {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}}

**Contacts:** Security {{SECURITY_EMAIL}} · Legal {{LEGAL_EMAIL}} · Support {{SUPPORT_EMAIL}}

**Scope:** This plan applies to the {{PRODUCT_TERM}} and its officially published artifacts. It complements the public `SECURITY` policy and is designed to meet CRA vulnerability-handling expectations while remaining feasible for a solo indie developer.

## 1. Intake

- **Primary channel:** the **Security Contact** email listed in `./legal/SECURITY.*` (currently: **{{SECURITY_EMAIL}}**).
- **Optional backup:** the **Support** contact in `./legal/INSTRUCTIONS.*`.
- **Minimum report content:** affected version/platform, steps to reproduce, impact, PoC (if feasible).
- **Acknowledgement:** best-effort; no SLA.

## 2. Triage & Severity

- Classify reports (**Critical / High / Medium / Low**) via simple rubric (impact × likelihood).
- Determine scope: core app, update mechanism, official packages; third-party platforms are out of scope unless directly affected by our code/config.

## 3. Coordination & Embargo

- Coordinate disclosure timing with the reporter to allow a fix or mitigation where reasonably possible.
- Keep details confidential until a fix/mitigation is available or disclosure is required by law/platform policy.

## 4. Remediation

- Prioritize fixes by severity and user impact.
- Validate fix; run minimal smoke tests.
- Prepare release notes/advisories; provide mitigations if полный фикс не готов.

## 5. Notifications (Legal/Regulatory)

- Where **required by law**, notify competent authorities and/or users **within mandated timelines** for actively exploited vulnerabilities or other reportable events.
  _Examples (depending on distribution/features):_ EU CRA; GDPR/UK-GDPR/LGPD/PIPEDA/AU Privacy (if personal data impacted); PIPL (China); sectoral rules.
- If distributed via app stores, follow their incident-disclosure rules.

## 6. Third-Party Components

- Track dependencies via **SBOM** (**{{SBOM_FORMAT}} at `{{SBOM_LOCATION}}`**).
- For vulnerable dependencies, assess exposure; upgrade, patch, or apply compensating controls. Note any OSS license constraints.

## 7. Communication

- **Advisories / release notes:** publish in the update package and/or in-product legal/notice screen; no fixed location/cadence guaranteed.
- Provide clear, минимальные шаги для обновления/миграции.

## 8. Record-Keeping

- Maintain a private log: intake date, severity, decisions, fix version, disclosure date.
- **Retention:** at least **{{IR_RECORD_RETENTION_MONTH}} months**, or longer if law requires.

## 9. Post-Incident Review

- Короткий ретро-разбор (что случилось, что помогло, что улучшить); подкрутить тесты/контроли, если практично.

## 10. Boundaries

- Нет bug bounty, если явно не объявлено.
- План **не** создаёт контрактных SLA или гарантий.
