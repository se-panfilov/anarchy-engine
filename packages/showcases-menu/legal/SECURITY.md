# Security Policy — showcases-menu

**Effective date:** TBD until market release

**Security Contact:** TBD until market release (email preferred for sensitive reports)

## Scope

This policy applies to the open-source project **showcases-menu** (the “Project”). It is provided for community coordination only and **does not create service levels (SLAs), warranties, or contractual obligations**.
It covers the Project’s **source code** and our **officially published release artifacts** (e.g., package registries, release archives, documentation sites, **container images**, or **CDN bundles**) that **we** publish. It does **not** cover third-party repackaging, unofficial builds, downstream products, hosting-platform infrastructure, or **commercial editions**.

**Technical identifiers (optional):** `showcases-menu`.

## Reporting (CVD)

- **Report:** email **TBD until market release** with steps to reproduce, affected commit/tag, and impact (if known). If possible, include a short patch or mitigation suggestion.
- **Public disclosure:** please **do not file public issues with exploit details**; coordinate timing with us to allow a fix or mitigation to be available where reasonably possible.

## Handling & Disclosure

This is a volunteer-maintained Project. We’ll make a **good-faith effort** to review and prioritize reports; **no timelines are promised**. We may publish an advisory if the issue materially impacts users. There is **no bug bounty** unless explicitly announced.

### Research Guidelines (please follow)

- Avoid accessing, modifying, or exfiltrating data you do not own; minimize impact and stop testing if you encounter personal data.
- Do not perform tests that degrade availability for others (e.g., volumetric DoS).
- Test only assets we publish through our **official channels** and that are reasonably within this Project’s scope.
- Vulnerabilities in **third-party platform infrastructure** (e.g., registry/hosting/CDN systems) are **out of scope** unless they result **directly** from our published code or configuration.
- Comply with applicable law and third-party terms.

## Version Support

We generally address issues on **main** and the **latest stable** release. Older releases may not receive fixes; please upgrade.

## Advisories

If warranted, we will publish a security note or advisory in the repository or adjacent Project materials (e.g., `SECURITY`, `CHANGELOG`, release notes, or the advisories section). There is **no SLA**.
Copies of public content may also appear in mirrors, forks, caches, or package registries controlled by others; **we do not control those third-party copies**.

## In / Out of Scope

- **In scope:** issues that materially impact the confidentiality, integrity, or availability of the Project’s code or its documented build/update mechanisms, as **we** publish them.
- **Out of scope:** social engineering, physical attacks, denial-of-service on third-party platforms, vulnerabilities in hosting/store/kernel infrastructure not packaged with the Project, issues in **unofficial forks**, repackaged distributions, or downstream products.

## Safe Harbor

We welcome good-faith research that avoids privacy violations and service disruption. If you comply with this policy and act in good faith, we **do not intend** to pursue legal action **solely** for your security research on this Project. This policy does not authorize unlawful activity or override third-party terms, and it does not protect actions that cause harm or data loss.

**Governing Law:** subject to mandatory law, matters under this policy are handled under **The Netherlands/Amsterdam**.
