# Security Policy — Anarchy Engine Showcases

**Effective date:** 11 January 2026

**Security Contact:** pnf036+anarchy_security@gmail.com

## Scope

This policy applies to commercial builds of **Anarchy Engine Showcases** (the “Software”). It explains how to report potential security issues and how we handle them. **It does not create service levels, warranties, or contractual obligations.** Distribution and updates may occur via any **distribution channels** in use from time to time (including installers, physical media, or package archives).

## Coordinated Vulnerability Disclosure (CVD)

- **Report:** email **pnf036+anarchy_security@gmail.com**. Include affected version/platform, minimal reproduction steps, impact, and (if possible) a small PoC.
- **File exchange:** if you need to share large files or sensitive artifacts, contact us first to arrange a secure channel.
- **Public disclosure:** please coordinate timing with us to allow a fix or mitigation to be available where reasonably possible.

## Handling

We will make a **good-faith effort** to triage and prioritize reports **without undue delay**. Where a vulnerability is confirmed, we will develop and deploy a **fix or mitigation in a timely manner**, prioritizing by severity and user impact. No specific remediation timelines are promised unless required by law.

### Research Guidelines (please follow)

- Avoid accessing, modifying, or exfiltrating data you do not own; minimize impact and stop testing if you encounter personal data.
- Do not perform tests that degrade availability for others (e.g., volumetric DoS).
- Only test assets reasonably in our control; third-party platforms and distribution channels are out of scope.
- Comply with applicable law and third-party terms.

## Regulatory Notifications

Where required by law, we will **notify competent authorities and/or users within the legally mandated timelines** for actively exploited vulnerabilities or other reportable events (including, where applicable in the EU, notification via competent CSIRTs/ENISA under Union law). No additional contractual commitments are created by this section.

**US CIRCIA.** If we are a **covered entity** under the U.S. Cyber Incident Reporting for Critical Infrastructure Act, we will submit reports to **CISA** within the timelines mandated by law for covered cyber incidents or ransom payments.

## Security Updates & Delivery

- **Delivery:** through applicable distribution channels in use from time to time, which may include automatic updates where available, or by providing updated files in the distribution package.
- **Advisories/release notes:** may be provided within the product, in the update package, or via the applicable distribution channel. No specific location or cadence is guaranteed.
- **Security support period:** as declared in **SUPPORT.md**; in any case the **shorter** of (i) the **declared expected lifetime** per **major version** and (ii) **five (5) years** from its initial commercial release.

## Software Bill of Materials (SBOM)

An SBOM is maintained in **CycloneDX JSON** at **`../compliance/sbom/`** or available on request.

## In / Out of Scope

- **In scope:** issues that materially impact the confidentiality, integrity, or availability of the shipped Software or its **update mechanism**.
- **Out of scope:** social engineering, physical attacks, denial-of-service on third-party platforms, vulnerabilities in third-party stores or OS kernels not packaged with the Software, issues in unofficial forks or repackaged distributions.

## Safe Harbor

If you comply with this policy and act in good faith, we **do not intend** to pursue legal action **solely** for your security research on the Software. This policy does not authorize any activity that violates applicable law or third-party terms, and it does not protect actions that cause harm or data loss.

**Governing Law:** subject to mandatory law, matters under this policy are handled under **The Netherlands/Amsterdam**.
