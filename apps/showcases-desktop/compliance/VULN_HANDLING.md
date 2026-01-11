# Incident Response & Vulnerability Handling Plan — TBD until market release

**Contacts:** Security pnf036+anarchy_security@gmail.com · Legal pnf036+anarchy@gmail.com · Support pnf036+anarchy@gmail.com

**Scope:** This plan applies to the Software and its officially published artifacts. It complements the public `SECURITY` policy and is designed to meet CRA vulnerability-handling expectations while remaining feasible for a solo indie developer.

## 1. Intake

- **Primary channel:** the **Security Contact** email listed in `./legal/SECURITY.*` (currently: **pnf036+anarchy_security@gmail.com**).
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
- Validate the fix; run minimal smoke tests.
- Prepare release notes/advisories; provide mitigations if a full fix is not immediately available.

## 5. Notifications (Legal/Regulatory)

- Where **required by law**, notify competent authorities and/or users **within mandated timelines** for actively exploited vulnerabilities or other reportable events.
  _Examples (depending on distribution/features):_ EU CRA; GDPR/UK-GDPR/LGPD/PIPEDA/AU Privacy (if personal data impacted); PIPL (China); sectoral rules.
- If distributed via app stores, follow their incident-disclosure rules.

## 6. Third-Party Components

- Track dependencies via **SBOM** (**CycloneDX JSON at `./sbom/`**; if not packaged with the build, available on request).
- For vulnerable dependencies, assess exposure; upgrade, patch, or apply compensating controls. Note any third-party license constraints.

## 7. Communication

- **Advisories / release notes:** publish in the update package and/or in-product legal/notice screen; no fixed location/cadence guaranteed.
- Provide clear, minimal steps for users to update or mitigate.

## 8. Record-Keeping

- Maintain a private log: intake date, severity, decisions, fix version, disclosure date.
- **Retention:** at least **24 months**, or longer if law requires.

## 9. Post-Incident Review

- Short retro-review (what happened, what helped, what to improve); adjust tests/controls if practical.

## 10. Boundaries

- No bug bounty unless explicitly stated.
- This plan **does not** create contractual SLAs or guarantees.
