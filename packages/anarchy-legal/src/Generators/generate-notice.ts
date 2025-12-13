import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';
// eslint-disable-next-line spellcheck/spell-checker
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { TWorkspaceInfo } from '@Anarchy/Legal';

/**
 * Anarchy-legal — NOTICE generator (generate-notice.ts)
 * Builds NOTICE.md by parsing the workspace's attribution source (e.g. THIRD_PARTY_LICENSES.md).
 *
 * USAGE
 *   node packages/anarchy-legal/src/commands/generate-notice.ts \
 *     --workspace <name|path> \
 *     [--source <path>] \
 *     [--source-name <file>] \
 *     [--out <NOTICE.md>] \
 *     [--include-upstream-notices] \
 *     [--max-upstream-notice-kb <N>] \
 *     [--audit] [--strict] \
 *     [--debug]
 *
 * OPTIONS
 *   --workspace               (string, required)
 *                             Workspace name or path relative to monorepo root.
 *
 *   --source                  (string, optional)
 *                             Full/relative path to the input attribution file to parse.
 *                             If provided, overrides --source-name.
 *
 *   --source-name             (string, optional)  Default: THIRD_PARTY_LICENSES.md
 *                             File name inside the workspace to read when --source is not set.
 *
 *   --out                     (string, optional)  Default: <workspace>/NOTICE.md
 *                             Output path for the generated NOTICE.
 *
 *   --include-upstream-notices (boolean, optional) Default: false
 *                             If set, also read NOTICE/NOTICE.md/NOTICE.txt from dependency install paths
 *                             (when those paths are present in the source file).
 *
 *   --max-upstream-notice-kb  (number, optional)  Default: 128
 *                             Per-package size limit (in KB) when in --include-upstream-notices mode.
 *
 *   --audit                   (boolean, optional) Default: false
 *                             Print a diff between headings (name@version) in source and parsed entries.
 *
 *   --strict                  (boolean, optional) Default: false
 *                             With --audit, exit with code 2 if mismatches are found.
 *
 *   --debug                   (boolean, optional)
 *                             Verbose logs.
 *
 * EXIT CODES
 *   0  success
 *   1  source file not found / general error
 *   2  audit mismatch when --strict is used
 */

// ---------------------- Types ----------------------

type TParsedEntry = Readonly<{
  id: string; // name@version
  name: string;
  version: string;
  licenses: ReadonlyArray<string>;
  repository?: string;
  url?: string;
  publisher?: string;
  path?: string;
  licenseText?: string; // raw license text if present
  inferredCopyright?: string; // extracted from licenseText or publisher
  upstreamNotice?: string; // filled only if --include-upstream-notices
}>;

// ---------------------- Utils ----------------------

let DEBUG = false;
const debugLog = (...args: ReadonlyArray<unknown>): void => {
  if (DEBUG) console.log('[debug]', ...args);
};

const exists = async (p: string): Promise<boolean> => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const readJson = async <T = any>(p: string): Promise<T> => JSON.parse(await fs.readFile(p, 'utf8')) as T;

const hasWorkspacesField = (pkg: any): boolean => {
  const ws = pkg?.workspaces;
  if (!ws) return false;
  if (Array.isArray(ws)) return ws.length > 0;
  if (typeof ws === 'object' && Array.isArray(ws.packages)) return ws.packages.length > 0;
  return false;
};

async function findMonorepoRoot(startDir: string): Promise<string> {
  let dir = path.resolve(startDir);
  debugLog('findMonorepoRoot: start at', dir);
  for (let i = 0; i < 50; i++) {
    const p = path.join(dir, 'package.json');
    debugLog('  check', p);
    if (await exists(p)) {
      try {
        const pkg = await readJson<any>(p);
        if (hasWorkspacesField(pkg)) return dir;
      } catch {
        /* ignore */
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error(`Monorepo root not found from ${startDir}`);
}

async function loadWorkspaces(rootDir: string): Promise<ReadonlyMap<string, TWorkspaceInfo>> {
  const rootPkg = await readJson<any>(path.join(rootDir, 'package.json'));
  const patterns: string[] = Array.isArray(rootPkg.workspaces) ? rootPkg.workspaces : (rootPkg.workspaces?.packages ?? []);
  if (!patterns.length) throw new Error(`No workspaces patterns in ${path.join(rootDir, 'package.json')}`);
  const dirs = await globby(patterns, { cwd: rootDir, absolute: true, onlyDirectories: true, gitignore: true, ignore: ['**/node_modules/**', '**/dist/**', '**/.*/**'] });
  const entries: Array<[string, TWorkspaceInfo]> = [];
  for (const dir of dirs) {
    const pkgPath = path.join(dir, 'package.json');
    if (!(await exists(pkgPath))) continue;
    const pkg = await readJson<Record<string, unknown>>(pkgPath);
    const name = typeof pkg.name === 'string' ? pkg.name : undefined;
    if (!name) continue;
    entries.push([name, { name, dir, pkgPath }]);
  }
  return new Map(entries);
}

function resolveWorkspaceFromArg(arg: string, workspaces: ReadonlyMap<string, TWorkspaceInfo>, rootDir: string): Readonly<{ ws: TWorkspaceInfo }> {
  const byName = workspaces.get(arg);
  if (byName) return { ws: byName };
  const asPath = path.isAbsolute(arg) ? arg : path.join(rootDir, arg);
  const norm = path.resolve(asPath);
  for (const w of workspaces.values()) {
    if (path.resolve(w.dir) === norm) return { ws: w };
  }
  throw new Error(`Workspace "${arg}" not found by name or path`);
}

// ---------------------- Parse THIRD_PARTY_LICENSES.md ----------------------

// split by '---' fences produced by our generator; keep chunks with any heading
function splitEntriesFromMarkdown(md: string): ReadonlyArray<string> {
  const parts = md.split(/\r?\n---\r?\n/g);
  return parts.filter((chunk) => /^##\s+.+/m.test(chunk));
}

// robust parse of "## <name>@<version>" allowing scoped names
function parseHeaderLine(chunk: string): { name: string; version: string } | undefined {
  const m = /^##\s+(.+?)\s*$/m.exec(chunk);
  if (!m) return undefined;
  const full = m[1].trim(); // e.g. "@babel/core@7.27.1"
  const at = full.lastIndexOf('@');
  if (at <= 0 || at === full.length - 1) return undefined;
  const name = full.slice(0, at).trim();
  const version = full.slice(at + 1).trim();
  if (!name || !version) return undefined;
  return { name, version };
}

function parseOneEntry(chunk: string): TParsedEntry | undefined {
  const hdr = parseHeaderLine(chunk);
  if (!hdr) return undefined;
  const { name, version } = hdr;
  const id = `${name}@${version}`;

  const field = (label: string): string | undefined => {
    const re = new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+)\\s*$`, 'mi');
    const m = re.exec(chunk);
    return m ? m[1].trim() : undefined;
  };

  const licensesStr = field('License') ?? 'UNKNOWN';
  const licenses = licensesStr
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const repository = field('Repository');
  const url = field('URL');
  const publisher = field('Publisher')
    ?.replace(/\s+<[^>]+>\s*$/, '')
    .trim();
  const pth = field('Path');

  // License text: tail after the first blank line following the header+KV area
  let licenseText: string | undefined = undefined;
  {
    const lines = chunk.split(/\r?\n/);
    let seenHeader = false;
    let idx = 0;
    for (; idx < lines.length; idx++) {
      const ln = lines[idx];
      if (ln.startsWith('## ')) {
        seenHeader = true;
        continue;
      }
      if (seenHeader && ln.trim() === '') {
        idx++;
        break;
      }
    }
    const tail = lines.slice(idx).join('\n').trim();
    if (tail && !/^_No license text file found;/m.test(tail)) licenseText = tail;
  }

  const inferredCopyright = (() => {
    if (licenseText) {
      const ln = licenseText.split(/\r?\n/).find((l) => /^\s*(?:copyright|\(c\)|©)\s+/i.test(l));
      if (ln) return ln.trim();
    }
    return publisher?.trim();
  })();

  return {
    id,
    name,
    version,
    licenses,
    repository: repository ?? undefined,
    url: url ?? undefined,
    publisher: publisher ?? undefined,
    path: pth ?? undefined,
    licenseText,
    inferredCopyright
  };
}

function parseThirdPartyMarkdown(md: string): ReadonlyArray<TParsedEntry> {
  const chunks = splitEntriesFromMarkdown(md);
  const out: TParsedEntry[] = [];
  for (const ch of chunks) {
    const e = parseOneEntry(ch);
    if (e) out.push(e);
  }
  out.sort((a, b) => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));
  return out;
}

// for audit: collect every heading id present in the source file
function collectAllHeadingIds(md: string): ReadonlySet<string> {
  const ids = new Set<string>();
  const re = /^##\s+(.+?)\s*$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md))) {
    const full = m[1].trim();
    const at = full.lastIndexOf('@');
    if (at > 0 && at < full.length - 1) {
      ids.add(`${full.slice(0, at).trim()}@${full.slice(at + 1).trim()}`);
    }
  }
  return ids;
}

// ---------------------- Optional upstream NOTICE fetch ----------------------

async function findUpstreamNoticeFile(dir: string): Promise<string | undefined> {
  try {
    const list = await fs.readdir(dir);
    const cand = list.find((f) => /^(notice|notice\.txt|notice\.md)$/i.test(f));
    return cand ? path.join(dir, cand) : undefined;
  } catch {
    return undefined;
  }
}

async function loadUpstreamNotice(dir: string, maxBytes: number): Promise<string | undefined> {
  const p = await findUpstreamNoticeFile(dir);
  if (!p) return undefined;
  try {
    const stat = await fs.stat(p);
    const txt = await fs.readFile(p, 'utf8');
    if (stat.size > maxBytes) {
      return `Upstream NOTICE is too large (${stat.size} bytes); truncated.\n\n` + txt.slice(0, maxBytes);
    }
    return txt;
  } catch {
    return undefined;
  }
}

// ---------------------- Render NOTICE.md ----------------------

function renderNotice(wsName: string, entries: ReadonlyArray<TParsedEntry>, includeUpstream: boolean): string {
  const lines: string[] = [];
  lines.push(`# NOTICE

## Application: ${wsName}

Components listed: ${entries.length}
`);

  if (entries.length === 0) {
    lines.push(`**Note:** No third-party components were detected.`);
  }

  for (const e of entries) {
    lines.push(`---`, ``);
    lines.push(`## ${e.name}@${e.version}`);
    lines.push(`**License(s):** ${e.licenses.length ? e.licenses.join(', ') : 'UNKNOWN'}`);
    if (e.repository) lines.push(`**Repository:** ${e.repository}`);
    if (e.url) lines.push(`**URL:** ${e.url}`);
    if (e.inferredCopyright) lines.push(`**Attribution:** ${e.inferredCopyright}`);
    lines.push(``);
    if (includeUpstream && e.upstreamNotice) {
      lines.push(`**Upstream NOTICE:**`);
      lines.push(...e.upstreamNotice.split(/\r?\n/).map((ln) => `> ${ln}`));
      lines.push(``);
    }
  }
  return lines.join('\n\n');
}

// ---------------------- Main ----------------------

async function main(): Promise<void> {
  const argv = await yargs(hideBin(process.argv))
    .scriptName('anarchy-legal:notice')
    .usage('$0 --workspace <name|path> [--source <path>] [--source-name <file>] [--out <NOTICE.md>] [--include-upstream-notices] [--max-upstream-notice-kb <N>] [--audit] [--strict] [--debug]')
    .option('workspace', { type: 'string', demandOption: true, describe: 'Target workspace (name or path relative to monorepo root)' })
    .option('source', { type: 'string', describe: 'Path to the input attribution file (default is <workspace>/<source-name>)' })
    .option('source-name', { type: 'string', default: 'THIRD_PARTY_LICENSES.md', describe: 'File name inside the workspace to read from when --source is not provided' })
    .option('out', { type: 'string', describe: 'Path to output NOTICE.md. Default: <workspace>/NOTICE.md' })
    .option('include-upstream-notices', { type: 'boolean', default: false, describe: 'Also read upstream NOTICE files from dependency install paths (if present in source)' })
    .option('max-upstream-notice-kb', { type: 'number', default: 128, describe: 'Max size per upstream NOTICE to read (kilobytes)' })
    .option('audit', { type: 'boolean', default: false, describe: 'Print a diff between headings in source and parsed entries' })
    .option('strict', { type: 'boolean', default: false, describe: 'With --audit, exit with code 2 if mismatches found' })
    .option('debug', { type: 'boolean', default: false })
    .help()
    .parseAsync();

  DEBUG = Boolean(argv.debug);

  // Locate monorepo root
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const startCandidates = [process.env.INIT_CWD, process.cwd(), scriptDir].filter(Boolean) as string[];
  let rootDir: string | undefined;
  for (const c of startCandidates) {
    try {
      rootDir = await findMonorepoRoot(c);
      break;
    } catch (e) {
      debugLog('no root from', c, ':', (e as Error).message);
    }
  }
  if (!rootDir) throw new Error(`Failed to find monorepo root from: ${startCandidates.join(', ')}`);

  // Workspaces
  const workspaces = await loadWorkspaces(rootDir);
  const { ws } = resolveWorkspaceFromArg(String(argv.workspace), workspaces, rootDir);
  debugLog('target workspace:', ws.name, ws.dir);

  // Source & Out paths
  const sourceName = String(argv['source-name'] || 'THIRD_PARTY_LICENSES.md');
  const defaultSource = path.join(ws.dir, sourceName);
  const srcPath = argv.source ? (path.isAbsolute(argv.source) ? argv.source : path.resolve(process.cwd(), argv.source)) : defaultSource;
  const outPath = argv.out ? (path.isAbsolute(argv.out) ? argv.out : path.resolve(process.cwd(), argv.out)) : path.join(ws.dir, 'NOTICE.md');

  debugLog('source:', srcPath);
  debugLog('out:', outPath);

  if (!(await exists(srcPath))) {
    console.error(`Source file not found: ${srcPath}`);
    process.exit(1);
  }

  const src = await fs.readFile(srcPath, 'utf8');

  // collect declared ids from headings for audit
  const declaredIds = collectAllHeadingIds(src);

  const entries = parseThirdPartyMarkdown(src);
  debugLog('parsed entries:', entries.length);

  // Optional upstream NOTICE load
  if (argv['include-upstream-notices']) {
    const maxBytes = Math.max(1, Math.floor(Number(argv['max-upstream-notice-kb']) || 128)) * 1024;
    let filled = 0;
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      if (!e.path) continue;
      const u = await loadUpstreamNotice(e.path, maxBytes);
      if (u) {
        (entries as any)[i] = { ...e, upstreamNotice: u };
        filled++;
      }
    }
    debugLog('upstream notices loaded:', filled);
  }

  // Audit report
  if (argv.audit) {
    const parsedIds = new Set(entries.map((e) => e.id));
    const missing: string[] = [];
    for (const id of declaredIds) if (!parsedIds.has(id)) missing.push(id);
    missing.sort();

    console.log(`NOTICE audit:
  headings in source:  ${declaredIds.size}
  parsed entries:      ${parsedIds.size}
  missing in NOTICE:   ${missing.length}`);

    if (missing.length) {
      console.log(missing.map((x) => `  - ${x}`).join('\n'));
      if (argv.strict) {
        console.error('Audit failed: some entries were not parsed into NOTICE.');
        process.exit(2);
      }
    } else {
      console.log('Audit OK: all entries accounted for.');
    }
  }

  const md = renderNotice(ws.name, entries, Boolean(argv['include-upstream-notices']));
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, md, 'utf8');
  console.log(`NOTICE.md written -> ${outPath}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});
