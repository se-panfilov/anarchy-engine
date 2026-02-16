# Anarchy engine anarchy-legal package

Error tracking utils for Anarchy apps.

## CLI scripts

The package exposes generator commands via npm bin. Each supports `--help`.

Example usage in a consumer `package.json`:

```json
{
  "scripts": {
    "legal:licenses": "anarchy-legal-generate-licenses --workspace packages/app --out ./legal/THIRD_PARTY_LICENSES.md",
    "legal:files": "anarchy-legal-generate-files --workspace packages/app --out ./legal",
    "legal:notice": "anarchy-legal-generate-notice --workspace packages/app --out ./legal/NOTICE.md"
  }
}
```

### anarchy-legal-generate-licenses

Produces THIRD_PARTY_LICENSES.md for a target workspace.

Usage:

```
anarchy-legal-generate-licenses \
  --workspace <name|path> \
  --out <THIRD_PARTY_LICENSES.md> \
  [--root <dir>] \
  [--no-include-workspaces] \
  [--include-workspace-self] \
  [--debug]
```

Options:

- `--workspace` (string, required) Workspace name (package.json:name) or path relative to monorepo root.
- `--out` (string, required) Output file path for THIRD_PARTY_LICENSES.md.
- `--root` (string, optional) Starting directory for monorepo root discovery (fallbacks: INIT_CWD, cwd, script dir).
- `--include-workspaces` / `--no-include-workspaces` (boolean, optional) Default: include.
- `--include-workspace-self` (boolean, optional) Default: false.
- `--debug` (boolean, optional) Verbose diagnostics.

Notes:

- External deps are derived from prod dependency “seeds” of the workspace closure (avoids hoisted/peer noise).
- Cycles between workspaces are detected and reported as errors.
- When no third-party deps are found, the file is still created with a short explanatory note.

### anarchy-legal-generate-files

Generates legal docs (DISCLAIMER, EULA, PRIVACY, SECURITY).

Usage:

```
anarchy-legal-generate-files \
  --workspace <name|path> \
  --out <dir> \
  [--templates <dir>] \
  [--types DISCLAIMER,EULA,PRIVACY,SECURITY] \
  [--debug]
```

Options:

- `--workspace` (string, required) Workspace name (from package.json) or path relative to monorepo root.
- `--out` (string, required) Output directory where docs are written.
- `--templates` (string, optional) Templates directory. If omitted, auto-detected.
- `--types` (string, optional) Comma-separated list of docs to generate. Default: DISCLAIMER,EULA,PRIVACY,SECURITY.
- `--debug` (boolean, optional) Verbose logs.

Notes:

- Placeholders use `{{NAME}}`. `PACKAGE_*` are filled from the target workspace package.json.
- Overrides and template selection come from `.anarchy-legal.config.json` in the workspace.

### anarchy-legal-generate-notice

Builds NOTICE.md by parsing the workspace attribution source (e.g. THIRD_PARTY_LICENSES.md).

Usage:

```
anarchy-legal-generate-notice \
  --workspace <name|path> \
  [--source <path>] \
  [--source-name <file>] \
  [--out <NOTICE.md>] \
  [--include-upstream-notices] \
  [--max-upstream-notice-kb <N>] \
  [--audit] [--strict] \
  [--debug]
```

Options:

- `--workspace` (string, required) Workspace name or path relative to monorepo root.
- `--source` (string, optional) Full/relative path to the input attribution file to parse.
- `--source-name` (string, optional) Default: THIRD_PARTY_LICENSES.md.
- `--out` (string, optional) Default: <workspace>/NOTICE.md.
- `--include-upstream-notices` (boolean, optional) Default: false.
- `--max-upstream-notice-kb` (number, optional) Default: 128.
- `--audit` (boolean, optional) Print a diff between headings in source and parsed entries.
- `--strict` (boolean, optional) With --audit, exit with code 2 if mismatches are found.
- `--debug` (boolean, optional) Verbose logs.

Exit codes:

- 0 success
- 1 source file not found / general error
- 2 audit mismatch when --strict is used

## License

MIT License

Copyright (c) 2025 Sergei Panfilov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Legal

See local files `LICENSE`, `CHANGELOG`, `NOTICE` (pointer), and files in `./legal`:
`DISCLAIMER`, `EULA`, `PRIVACY`, `SECURITY`, `NOTICE` (full), `THIRD_PARTY_LICENSES`.

Contacts — Privacy: pnf036+anarchy@gmail.com, Security: pnf036+anarchy_security@gmail.com.
