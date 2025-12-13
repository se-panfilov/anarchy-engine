# Instructions & Support — {{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}}

**Effective date:** {{EFFECTIVE_DATE}}
**Publisher/Developer:** {{LEGAL_ENTITY_NAME}}
**Support contact:** {{SUPPORT_EMAIL}}

> This document provides basic use, safety, and compliance information for **{{PRODUCT_DISPLAY_NAME}}{{TRADEMARK_SYMBOL}}** (the “{{PRODUCT_TERM}}”). It does **not** create service levels, warranties, or contractual obligations. For license terms, see **EULA** (`EULA.*`). For privacy, see **Privacy Policy** (`PRIVACY.*`). For security and updates, see **Security Policy** (`SECURITY.*`).

---

{{#SHOW_BUILD_ID}}

## Build Identification (optional)

- **Version:** {{PACKAGE_VERSION}}
- **Major version:** {{MAJOR_VERSION}}
- **Build ID / Commit:** {{BUILD_ID}}
- **Initial commercial release:** {{INITIAL_RELEASE_DATE}}
  {{/SHOW_BUILD_ID}}

## 1) What this {{PRODUCT_TERM}} is

- **{{PRODUCT_TERM}}:** {{PRODUCT_SHORT_PURPOSE}}.

Operates **offline** by default; any online features, if offered, are **opt-in**. No personal data collection during offline use (see **Privacy Policy** for details).

{{#SUPPORTED_PLATFORMS}}
**Supported platforms (indicative):** {{SUPPORTED_PLATFORMS}}.
{{/SUPPORTED_PLATFORMS}}
{{#MIN_SYSTEM_REQUIREMENTS}}

> **Indicative requirements**. Performance and compatibility depend on device, GPU/driver, OS updates, and browser/runtime. Some older/integrated GPUs or blocked drivers may not support all effects. Where WebGL 2 is unavailable, limited fallback may run with reduced visuals (not guaranteed).

**Minimum system requirements (indicative):**
{{MIN_SYSTEM_REQUIREMENTS}}

**Recommended system requirements (indicative):**
{{REC_SYSTEM_REQUIREMENTS}}

**Network:** {{NETWORK_REQUIREMENT}}.
{{/MIN_SYSTEM_REQUIREMENTS}}

---

## 2) Install / Uninstall

- **Install:** obtain the {{PRODUCT_TERM}} via your chosen distribution channel or by running the provided installer / extracting the distribution package.
- **Permissions:** administrative rights may be required to install to protected locations.
- **Uninstall:** use the OS standard uninstall mechanism or remove the installed folder; user-created content/mods remain in your user data directories unless you remove them.

> No specific connectivity or account is required for basic offline use.

---

## 3) Updates

- We may provide **updates** (patches, bug fixes, content changes). Updates can be delivered through the same channels you used to obtain the {{PRODUCT_TERM}} or as replacement files in the package.
- Some updates may be required to continue using certain features.
- Release notes / advisories may be included within the product, inside the update package, or provided via the distribution channel (**no fixed location/cadence guaranteed**).
- Security maintenance periods are described in the **Support Period Policy** (`SUPPORT.md`) and the **Security Policy** (`SECURITY.*`).

---

## 4) Safety & Acceptable Use (summary)

- Do **not** use the {{PRODUCT_TERM}} for unlawful purposes or to distribute malware, cheats, or tools that degrade others’ experience or security.
- Avoid use in **safety-critical** contexts where failure could cause injury, environmental, or property damage. See the **Disclaimer** (in this folder).

---

## 5) CE Marking (EU)

Below is the CE mark included for electronic placement in these instructions:

![CE Mark]({{PATH_TO_CE_MARK}} 'CE')

- The CE mark indicates conformity of the {{PRODUCT_TERM}} with applicable EU legislation (including cybersecurity/product-safety rules where relevant).
- The CE mark may also **appear inside the product** (for example, in an “About / Legal” view, installer screen, splash, or another compliance section) **depending on build and language**.
- The **EU Declaration of Conformity** is included here as: `EU_DECLARATION_OF_CONFORMITY.pdf`.

> Placement of the mark within UI may vary across versions and locales; electronic display in these instructions satisfies the electronic marking modality.

---

## 6) Privacy (summary)

- The {{PRODUCT_TERM}} does **not** collect personal data during offline use.
- Optional online features (if any) are **opt-in**.
- Details, including any optional crash reporting, are described in **Privacy Policy**.

---

## 7) Mods / Extensions (if supported)

- You may create and use mods at your **own risk**, provided they comply with law and do not harm security/performance or infringe rights.
- Updates may break mods; compatibility is **not** guaranteed. See **EULA** for the governing terms.

---

## 8) Troubleshooting

- Try restarting the {{PRODUCT_TERM}} and your device; verify file integrity where applicable.
- Check system permissions (read/write where the {{PRODUCT_TERM}} stores user data) and antivirus exclusions if needed.
- For reproducible issues, include OS/version, steps to reproduce, logs (if available), and hardware info when contacting support.

---

## 9) Support

- **Email:** {{SUPPORT_EMAIL}}
- We will make a **good-faith effort** to review support messages; **no SLAs** are provided unless agreed separately.
  {{#HAS_ACCESSIBILITY_CONTACT}}
- **Accessibility:** for reasonable accommodation requests, contact {{ACCESSIBILITY_CONTACT}}.
  {{/HAS_ACCESSIBILITY_CONTACT}}

---

## 10) Legal & Compliance (where to find)

All legal documents are provided **offline** in this folder (canonical filenames in backticks):

- **End User License Agreement** — `EULA.md`
- **Privacy Policy** — `PRIVACY.md`
- **Security Policy** — `SECURITY.md`
- **Disclaimer** — `DISCLAIMER.md`
- **Third-Party Notices** — `NOTICE.md` and `THIRD_PARTY_LICENSES.md`
- **Primary License** — `LICENSE`
- **EU Declaration of Conformity** — `EU_DECLARATION_OF_CONFORMITY.pdf`
- **CE mark image** — `ce-mark.png`
- **Software Bill of Materials** — `{{SBOM_LOCATION}}`

> External links are avoided where possible so that required information remains available offline within the distribution.

---

## 11) Export Controls (summary)

Use, export, and re-export must comply with applicable **export-control** and **sanctions** laws. See **Disclaimer** / **EULA**.

---

### Notes

- File extensions `.*` indicate that both `.md` and/or `.pdf` forms may be included.
- Localized versions of these instructions may be provided; where local-language versions are required by law, those control to the extent required.
