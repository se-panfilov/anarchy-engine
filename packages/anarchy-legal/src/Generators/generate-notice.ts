import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// eslint-disable-next-line spellcheck/spell-checker
import { globby } from 'globby';
// eslint-disable-next-line spellcheck/spell-checker
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// ---------------------- Types ----------------------

type TWorkspaceInfo = Readonly<{
  name: string;
  dir: string; // abs path
  pkgPath: string; // abs path to package.json
}>;

type TRootInfo = Readonly<{
  rootDir: string;
  workspaces: ReadonlyMap<string, TWorkspaceInfo>;
}>;

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
const dlog = (...args: ReadonlyArray<unknown>): void => {
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

const findMonorepoRoot = async (startDir: string): Promise<string> => {
  let dir = path.resolve(startDir);
  dlog('findMonorepoRoot: start at', dir);
  for (let i = 0; i < 50; i++) {
    const p = path.join(dir, 'package.json');
    dlog('  check', p);
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
};

const loadWorkspaces = async (rootDir: string): Promise<ReadonlyMap<string, TWorkspaceInfo>> => {
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
};

const resolveWorkspaceFromArg = (arg: string, workspaces: ReadonlyMap<string, TWorkspaceInfo>, rootDir: string): Readonly<{ ws: TWorkspaceInfo }> => {
  const byName = workspaces.get(arg);
  if (byName) return { ws: byName };
  const asPath = path.isAbsolute(arg) ? arg : path.join(rootDir, arg);
  const norm = path.resolve(asPath);
  for (const w of workspaces.values()) {
    if (path.resolve(w.dir) === norm) return { ws: w };
  }
  throw new Error(`Workspace "${arg}" not found by name or path`);
};

// ---------------------- Parse THIRD_PARTY_LICENSES.md ----------------------

const splitEntriesFromMarkdown = (md: string): ReadonlyArray<string> => {
  // Entries are separated by lines with '---'
  // We will split on '^---$' and keep chunks that contain '## <name>@<version>'
  const parts = md.split(/\r?\n---\r?\n/g);
  return parts.filter((chunk) => /^##\s+.+@.+/m.test(chunk));
};

const parseOneEntry = (chunk: string): TParsedEntry | undefined => {
  // Header: "## name@version"
  const hdr = /^##\s+([^\s@]+)@([^\s]+)\s*$/m.exec(chunk);
  if (!hdr) return undefined;
  const name = hdr[1].trim();
  const version = hdr[2].trim();
  const id = `${name}@${version}`;

  // Key-value lines
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
    .trim(); // strip email if present
  const pth = field('Path');

  // License text: between the blank line after fields and the end of chunk
  // detection: we look for the first blank line after '**Path:** ...' or last field,
  // then anything after that, except when it's the "No license text file found..." note.
  let licenseText: string | undefined = undefined;
  {
    // get substring starting at first blank line after header section
    const kvEndIdx = (() => {
      const lines = chunk.split(/\r?\n/);
      let seenHeader = false;
      let idx = 0;
      for (; idx < lines.length; idx++) {
        if (lines[idx].startsWith('## ')) {
          seenHeader = true;
          continue;
        }
        if (seenHeader && lines[idx].trim() === '') {
          idx++;
          break;
        }
      }
      // idx now at first line of potential license text
      return idx;
    })();
    const tail = chunk.split(/\r?\n/).slice(kvEndIdx).join('\n').trim();
    if (tail && !/^_No license text file found;/m.test(tail)) {
      licenseText = tail;
    }
  }

  // Infer copyright line
  const inferCopyright = (): string | undefined => {
    if (licenseText) {
      const lines = licenseText.split(/\r?\n/);
      const found = lines.find((ln) => /^\s*(?:copyright|\(c\)|©)\s+/i.test(ln));
      if (found) return found.trim();
    }
    return publisher?.trim();
  };

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
    inferredCopyright: inferCopyright()
  };
};

const parseThirdPartyMarkdown = (md: string): ReadonlyArray<TParsedEntry> => {
  const chunks = splitEntriesFromMarkdown(md);
  const out: TParsedEntry[] = [];
  for (const ch of chunks) {
    const e = parseOneEntry(ch);
    if (e) out.push(e);
  }
  // stable sort
  out.sort((a, b) => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));
  return out;
};

// ---------------------- Optional upstream NOTICE fetch ----------------------

const findUpstreamNoticeFile = async (dir: string): Promise<string | undefined> => {
  try {
    const list = await fs.readdir(dir);
    const cand = list.find((f) => /^(notice|notice\.txt|notice\.md)$/i.test(f));
    return cand ? path.join(dir, cand) : undefined;
  } catch {
    return undefined;
  }
};

const loadUpstreamNotice = async (dir: string, maxBytes: number): Promise<string | undefined> => {
  const p = await findUpstreamNoticeFile(dir);
  if (!p) return undefined;
  try {
    const stat = await fs.stat(p);
    if (stat.size > maxBytes) {
      return `Upstream NOTICE is too large (${stat.size} bytes); truncated.\n\n` + (await fs.readFile(p, { encoding: 'utf8' })).slice(0, maxBytes);
    }
    return await fs.readFile(p, 'utf8');
  } catch {
    return undefined;
  }
};

// ---------------------- Render NOTICE.md ----------------------

const renderNotice = (wsName: string, entries: ReadonlyArray<TParsedEntry>, includeUpstream: boolean): string => {
  const now = new Date().toISOString();
  const lines: string[] = [];
  lines.push(`# NOTICE`, ``);
  lines.push(`Generated: ${now}`);
  lines.push(`Workspace: \`${wsName}\``);
  lines.push(`Components listed: ${entries.length}`, ``);

  if (entries.length === 0) {
    lines.push(`**Note:** No third-party components were detected for this workspace at generation time.`);
    lines.push(`This file is generated from \`THIRD_PARTY_LICENSES.md\`. If that file lists no packages, there are no third-party notices to include.`, ``);
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
      // Present as blockquote to avoid clobbering layout
      lines.push(...e.upstreamNotice.split(/\r?\n/).map((ln) => `> ${ln}`));
      lines.push(``);
    }
  }

  lines.push(`---`, ``, `_Generated by Anarchy-legal (NOTICE generator)._`);
  return lines.join('\n');
};

// ---------------------- Main ----------------------

const main = async (): Promise<void> => {
  const argv = await yargs(hideBin(process.argv))
    .scriptName('anarchy-legal:notice')
    .usage('$0 --workspace <name|path> [--source <THIRD_PARTY_LICENSES.md>] [--out <NOTICE.md>] [--include-upstream-notices] [--max-upstream-notice-kb <N>] [--debug]')
    .option('workspace', { type: 'string', demandOption: true, describe: 'Target workspace (name or path relative to monorepo root)' })
    .option('source', { type: 'string', describe: 'Path to THIRD_PARTY_LICENSES.md. Default: <workspace>/THIRD_PARTY_LICENSES.md' })
    .option('out', { type: 'string', describe: 'Path to output NOTICE.md. Default: <workspace>/NOTICE.md' })
    .option('include-upstream-notices', { type: 'boolean', default: false, describe: 'Also read upstream NOTICE files from dependency install paths (if present in THIRD_PARTY_LICENSES.md)' })
    .option('max-upstream-notice-kb', { type: 'number', default: 128, describe: 'Max size per upstream NOTICE to read (kilobytes)' })
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
      dlog('no root from', c, ':', (e as Error).message);
    }
  }
  if (!rootDir) throw new Error(`Failed to find monorepo root from: ${startCandidates.join(', ')}`);

  // Workspaces
  const workspaces = await loadWorkspaces(rootDir);
  const { ws } = resolveWorkspaceFromArg(String(argv.workspace), workspaces, rootDir);
  dlog('target workspace:', ws.name, ws.dir);

  // Source & Out paths
  const defaultSource = path.join(ws.dir, 'THIRD_PARTY_LICENSES.md');
  const srcPath = argv.source ? (path.isAbsolute(argv.source) ? argv.source : path.resolve(process.cwd(), argv.source)) : defaultSource;
  const outPath = argv.out ? (path.isAbsolute(argv.out) ? argv.out : path.resolve(process.cwd(), argv.out)) : path.join(ws.dir, 'NOTICE.md');

  dlog('source:', srcPath);
  dlog('out:', outPath);

  if (!(await exists(srcPath))) {
    console.warn(`[warn] THIRD_PARTY_LICENSES.md not found at: ${srcPath}`);
    // Generate an empty NOTICE with note
    const md = renderNotice(ws.name, [], false);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, md, 'utf8');
    console.log(`✔ NOTICE.md written (empty) -> ${outPath}`);
    return;
  }

  const src = await fs.readFile(srcPath, 'utf8');
  const entries = parseThirdPartyMarkdown(src);
  dlog('parsed entries:', entries.length);

  // Optionally enrich with upstream NOTICE
  if (argv['include-upstream-notices']) {
    const maxBytes = Math.max(1, Math.floor(Number(argv['max-upstream-notice-kb']) || 128)) * 1024;
    let filled = 0;
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      if (!e.path) continue;
      const u = await loadUpstreamNotice(e.path, maxBytes);
      if (u) {
        (entries as any)[i] = { ...e, upstreamNotice: u } as TParsedEntry;
        filled++;
      }
    }
    dlog('upstream notices loaded:', filled);
  }

  const md = renderNotice(ws.name, entries, Boolean(argv['include-upstream-notices']));
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, md, 'utf8');
  console.log(`✔ NOTICE.md written -> ${outPath}`);
};

main().catch((e) => {
  console.error(`✖ ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
});
