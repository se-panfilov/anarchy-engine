import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TNoticeService, TRepoUtilsService } from '@Anarchy/Legal/Models';
// eslint-disable-next-line spellcheck/spell-checker
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { RepoUtilsService } from './RepoUtilsService.ts';

export function NoticeService(): TNoticeService {
  let isDebug: boolean = false;
  const repoUtilsService: TRepoUtilsService = RepoUtilsService();

  const { debugLog, findMonorepoRoot, isExist, loadWorkspaces, resolveWorkspaceFromArg } = repoUtilsService;

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

  // split by '---' fences produced by our generator; keep chunks with any heading
  function splitEntriesFromMarkdown(md: string): ReadonlyArray<string> {
    const parts = md.split(/\r?\n---\r?\n/g);
    return parts.filter((chunk) => /^##\s+.+/m.test(chunk));
  }

  // robust parse of "## <name>@<version>" allowing scoped names
  function parseHeaderLine(chunk: string): { name: string; version: string } | undefined {
    const m = /^##\s+(.+?)\s*$/m.exec(chunk);
    if (!m) return undefined;
    const full: string = m[1].trim(); // e.g. "@babel/core@7.27.1"
    const at = full.lastIndexOf('@');
    if (at <= 0 || at === full.length - 1) return undefined;
    const name: string = full.slice(0, at).trim();
    const version: string = full.slice(at + 1).trim();
    if (!name || !version) return undefined;
    return { name, version };
  }

  function parseOneEntry(chunk: string): TParsedEntry | undefined {
    const header = parseHeaderLine(chunk);
    if (!header) return undefined;
    const { name, version } = header;
    const id = `${name}@${version}`;

    const field = (label: string): string | undefined => {
      const re = new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+)\\s*$`, 'mi');
      const m: RegExpExecArray | null = re.exec(chunk);
      return m ? m[1].trim() : undefined;
    };

    const licensesStr: string = field('License') ?? 'UNKNOWN';
    const licenses: string[] = licensesStr
      .split(',')
      .map((s: string): string => s.trim())
      .filter(Boolean);

    const repository: string | undefined = field('Repository');
    const url: string | undefined = field('URL');
    const publisher = field('Publisher')
      ?.replace(/\s+<[^>]+>\s*$/, '')
      .trim();
    const path: string | undefined = field('Path');

    // License text: tail after the first blank line following the header+KV area
    let licenseText: string | undefined = undefined;
    {
      const lines = chunk.split(/\r?\n/);
      const firstBlankAfterHeaderIdx: number = ((): number => {
        let seenHeader: boolean = false;
        return lines.findIndex((ln: string): boolean => {
          if (ln.startsWith('## ')) {
            seenHeader = true;
            return false;
          }
          return seenHeader && ln.trim() === '';
        });
      })();
      const startIdx: number = firstBlankAfterHeaderIdx >= 0 ? firstBlankAfterHeaderIdx + 1 : lines.length;
      const tail: string = lines.slice(startIdx).join('\n').trim();
      if (tail && !/^_No license text file found;/m.test(tail)) licenseText = tail;
    }

    const inferredCopyright: string | undefined = ((): string | undefined => {
      if (licenseText) {
        const ln: string | undefined = licenseText.split(/\r?\n/).find((l: string): boolean => /^\s*(?:copyright|\(c\)|©)\s+/i.test(l));
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
      path: path ?? undefined,
      licenseText,
      inferredCopyright
    };
  }

  function parseThirdPartyMarkdown(md: string): ReadonlyArray<TParsedEntry> {
    const chunks = splitEntriesFromMarkdown(md);
    const entries = chunks.flatMap((ch) => {
      const e = parseOneEntry(ch);
      return e ? [e] : [];
    });
    const sorted = entries.toSorted((a, b) => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));
    return sorted;
  }

  // for audit: collect every heading id present in the source file
  function collectAllHeadingIds(md: string): ReadonlySet<string> {
    const re = /^##\s+(.+?)\s*$/gm;
    return [...md.matchAll(re)].reduce<Set<string>>((ids, m) => {
      const full = String(m[1]).trim();
      const at = full.lastIndexOf('@');
      if (at > 0 && at < full.length - 1) {
        ids.add(`${full.slice(0, at).trim()}@${full.slice(at + 1).trim()}`);
      }
      return ids;
    }, new Set<string>());
  }

  async function findUpstreamNoticeFile(dir: string): Promise<string | undefined> {
    try {
      const list = await fs.readdir(dir);
      const candidate = list.find((f) => /^(notice|notice\.txt|notice\.md)$/i.test(f));
      return candidate ? path.join(dir, candidate) : undefined;
    } catch {
      return undefined;
    }
  }

  async function loadUpstreamNotice(dir: string, maxBytes: number): Promise<string | undefined> {
    const p = await findUpstreamNoticeFile(dir);
    if (!p) return undefined;
    try {
      const stat = await fs.stat(p);
      const text: string = await fs.readFile(p, 'utf8');
      if (stat.size > maxBytes) {
        return `Upstream NOTICE is too large (${stat.size} bytes); truncated.\n\n` + text.slice(0, maxBytes);
      }
      return text;
    } catch {
      return undefined;
    }
  }

  function renderNotice(wsName: string, entries: ReadonlyArray<TParsedEntry>, includeUpstream: boolean): string {
    const header: string = `# NOTICE

## Application: ${wsName}

Components listed: ${entries.length}

`;

    const note: string = entries.length === 0 ? `**Note:** No third-party components were detected.` : '';

    const blocks: ReadonlyArray<ReadonlyArray<string>> = entries.map((v: TParsedEntry): ReadonlyArray<string> => {
      const licenses: string = v.licenses.length ? v.licenses.join(', ') + '\n' : 'UNKNOWN';
      const repository: string = v.repository ? `**Repository:** ${v.repository}\n\n` : '';
      const url: string = v.url ? `**URL:** ${v.url}\n\n` : '';
      const inferredCopyright: string = v.inferredCopyright ? `**Attribution:** ${v.inferredCopyright}\n\n` : '';

      const base: string = `---

## ${v.name}@${v.version}

**License(s):** ${licenses}
${repository}${url}${inferredCopyright}`;
      const upstream: ReadonlyArray<string> = includeUpstream && v.upstreamNotice ? [`**Upstream NOTICE:**`, ...v.upstreamNotice.split(/\r?\n/).map((ln) => `> ${ln}`), ``] : [];
      return [base, ...upstream];
    });

    return [header, note, ...blocks.flat()].join('');
  }

  // ---------------------- Main ----------------------

  async function generate(): Promise<void> {
    // eslint-disable-next-line spellcheck/spell-checker
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

    isDebug = Boolean(argv.debug);
    repoUtilsService.setDebugMode(isDebug);

    // Locate monorepo root
    const scriptDir = path.dirname(fileURLToPath(import.meta.url));
    const startCandidates = [process.env.INIT_CWD, process.cwd(), scriptDir].filter(Boolean) as string[];
    const rootDir: string | undefined = await startCandidates.reduce<Promise<string | undefined>>(async (accP, c) => {
      const acc = await accP;
      if (acc) return acc;
      try {
        return await findMonorepoRoot(c);
      } catch (e) {
        debugLog(isDebug, 'no root from', c, ':', (e as Error).message);
        return undefined;
      }
    }, Promise.resolve(undefined));
    if (!rootDir) throw new Error(`Failed to find monorepo root from: ${startCandidates.join(', ')}`);

    // Workspaces
    const workspaces = await loadWorkspaces(rootDir);
    const ws = resolveWorkspaceFromArg(String(argv.workspace), workspaces, rootDir);
    debugLog(isDebug, 'target workspace:', ws.name, ws.dir);

    // Source & Out paths
    const sourceName = String(argv['source-name'] || 'THIRD_PARTY_LICENSES.md');
    const defaultSource = path.join(ws.dir, sourceName);
    const srcPath = argv.source ? (path.isAbsolute(argv.source) ? argv.source : path.resolve(process.cwd(), argv.source)) : defaultSource;
    const outPath = argv.out ? (path.isAbsolute(argv.out) ? argv.out : path.resolve(process.cwd(), argv.out)) : path.join(ws.dir, 'NOTICE.md');

    debugLog(isDebug, 'source:', srcPath);
    debugLog(isDebug, 'out:', outPath);

    if (!(await isExist(srcPath))) {
      console.error(`Source file not found: ${srcPath}`);
      process.exit(1);
    }

    const src = await fs.readFile(srcPath, 'utf8');

    // collect declared ids from headings for audit
    const declaredIds = collectAllHeadingIds(src);

    const entries = parseThirdPartyMarkdown(src);
    debugLog(isDebug, 'parsed entries:', entries.length);

    // Optional upstream NOTICE load
    const finalEntries: ReadonlyArray<TParsedEntry> = await (async (): Promise<ReadonlyArray<TParsedEntry>> => {
      if (!argv['include-upstream-notices']) return entries;
      const maxBytes = Math.max(1, Math.floor(Number(argv['max-upstream-notice-kb']) || 128)) * 1024;
      const withUpstream = await Promise.all(
        entries.map(async (e) => {
          if (!e.path) return e;
          const u = await loadUpstreamNotice(e.path, maxBytes);
          return u ? { ...e, upstreamNotice: u } : e;
        })
      );
      const filledCount = withUpstream.filter((e) => Boolean(e.upstreamNotice)).length;
      debugLog(isDebug, 'upstream notices loaded:', filledCount);
      return withUpstream;
    })();

    // Audit report
    if (argv.audit) {
      const parsedIds = new Set(finalEntries.map((e) => e.id));
      const missing = Array.from(declaredIds)
        .filter((id): boolean => !parsedIds.has(id))
        .toSorted();

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

    const md: string = renderNotice(ws.name, entries, Boolean(argv['include-upstream-notices']));
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, md, 'utf8');
    console.log(`NOTICE.md written -> ${outPath}`);
  }

  return { generate };
}
