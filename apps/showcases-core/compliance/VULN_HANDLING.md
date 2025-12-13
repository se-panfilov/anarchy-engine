# Incident Response & Vulnerability Handling Plan — TBD until market release

**Contacts:** Security TBD until market release · Legal TBD until market release · Support TBD until market release
**Scope:** This plan applies to the Software and its officially published artifacts. It complements the public `SECURITY` policy and is designed to meet CRA vulnerability-handling expectations, while remaining feasible for a solo indie developer.

## 1. Intake

- **Channels:** primary — TBD until market release (email). Optional backups: .
- **Minimum report content:** affected version/platform, steps to reproduce, impact, PoC (if feasible).
- **Acknowledgement:** on a good-faith, best-effort basis; no SLA.

## 2. Triage & Severity

- Classify reports (e.g., **Critical / High / Medium / Low**) using a simple rubric (impact × likelihood).
- Determine scope: core app, update mechanism, official packages; third-party platforms are out of scope unless directly affected by our code/config.

## 3. Coordination & Embargo

- Coordinate disclosure timing with the reporter to allow a fix or mitigation where reasonably possible.
- Keep report details confidential until a fix/mitigation is available or disclosure is otherwise required by law or platform policy.

## 4. Remediation

- Prioritize fixes based on severity and user impact.
- Validate the fix and check for regressions (minimal smoke tests).
- Prepare release notes/advisories; include mitigation steps when a full fix is not immediately available.

## 5. Notifications (Legal/Regulatory)

- Where **required by law**, notify competent authorities and/or users **within the legally mandated timelines** for actively exploited vulnerabilities or other reportable events.
  _Examples of potentially applicable regimes (depending on distribution and features):_ EU CRA, GDPR/UK-GDPR/LGPD/PIPEDA/AU Privacy (if personal data is impacted), PIPL (China), and sectoral rules.
- If operating via app stores, follow their incident disclosure policies.

## 6. Third-Party Components

- Track dependencies via **SBOM** ( at ).
- For vulnerable dependencies, assess exposure; upgrade, patch, or apply compensating controls. Note any OSS license constraints.

## 7. Communication

- **Advisories / release notes:** publish via in-product legal/notice screen or within the update package; no fixed location/cadence is guaranteed.
- Provide users with clear, minimal steps to update or mitigate.

## 8. Record-Keeping

- Maintain a private log of incidents: intake date, severity, decisions, fix version, disclosure date.
  **Retention:** keep records for at least **24 months**, or longer if required by law.

## 9. Post-Incident Review

- Brief retrospective (what happened, what helped, what to improve); adjust tests/controls if practical.

## 10. Boundaries

- No bug bounty is offered unless expressly announced.
- This plan does **not** create contractual SLAs or warranties.
