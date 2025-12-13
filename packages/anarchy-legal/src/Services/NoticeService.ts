import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TNoticeService, TNoticeUtilsService, TRepoUtilsService, TTemplateParsedEntry, TWorkspaceInfo } from '@Anarchy/Legal/Models';
// eslint-disable-next-line spellcheck/spell-checker
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { NoticeUtilsService } from './NoticeUtilsService.ts';
import { RepoUtilsService } from './RepoUtilsService.ts';

export function NoticeService(): TNoticeService {
  let isDebug: boolean = false;
  const repoUtilsService: TRepoUtilsService = RepoUtilsService();
  const noticeUtilsService: TNoticeUtilsService = NoticeUtilsService();

  const { debugLog, findMonorepoRoot, isExist, loadWorkspaces, resolveWorkspaceFromArg } = repoUtilsService;
  const { collectAllHeadingIds, parseThirdPartyMarkdown, loadUpstreamNotice } = noticeUtilsService;

  function renderNotice(wsName: string, entries: ReadonlyArray<TTemplateParsedEntry>, includeUpstream: boolean, sourceName: string): string {
    const header: string = `# Third-Party Notices

## Application: ${wsName}

This product includes third-party components. Their **licenses and attributions** are listed below.
For the **full license texts**, see \`${sourceName}\`.

Components listed: ${entries.length}

## 1) Mandatory Attributions (verbatim)

The following notices are reproduced as provided by the respective licensors (e.g., **Apache-2.0 NOTICE**, **CC-BY credits**, **font attributions**):
`;

    const note: string = entries.length === 0 ? `**Note:** No third-party components were detected.` : '';

    const blocks: ReadonlyArray<ReadonlyArray<string>> = entries.map((v: TTemplateParsedEntry): ReadonlyArray<string> => {
      const licenses: string = v.licenses.length ? v.licenses.join(', ') + '\n' : 'UNKNOWN';
      const repository: string = v.repository ? `**Repository:** ${v.repository}\n\n` : '';
      const url: string = v.url ? `**URL:** ${v.url}\n\n` : '';
      const inferredCopyright: string = v.inferredCopyright ? `**Attribution:** ${v.inferredCopyright}\n\n` : '';

      const base: string = `
## ${v.name}@${v.version}

**License(s):** ${licenses}
${repository}${url}${inferredCopyright}
---
`;
      const upstream: ReadonlyArray<string> = includeUpstream && v.upstreamNotice ? [`**Upstream NOTICE:**`, ...v.upstreamNotice.split(/\r?\n/).map((ln) => `> ${ln}`), ``] : [];
      return [base, ...upstream];
    });

    const footer: string = `
    ## 2) General OSS Acknowledgment

This product incorporates open-source software. **If any term of this file or the EULA conflicts with an OSS license for a specific component, the OSS license controls for that component.**
`;

    return [header, note, ...blocks.flat(), footer].join('');
  }

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
    const scriptDir: string = path.dirname(fileURLToPath(import.meta.url));
    const startCandidates = [process.env.INIT_CWD, process.cwd(), scriptDir].filter(Boolean) as string[];
    const rootDir: string | undefined = await startCandidates.reduce<Promise<string | undefined>>(async (accP: Promise<string | undefined>, c: string): Promise<string | undefined> => {
      const acc: string | undefined = await accP;
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
    const workspaces: ReadonlyMap<string, TWorkspaceInfo> = await loadWorkspaces(rootDir);
    const ws: TWorkspaceInfo = resolveWorkspaceFromArg(String(argv.workspace), workspaces, rootDir);
    debugLog(isDebug, 'target workspace:', ws.name, ws.dir);

    // Source & Out paths
    const sourceName: string = String(argv['source-name'] || 'THIRD_PARTY_LICENSES.md');
    const defaultSource: string = path.join(ws.dir, sourceName);
    const srcPath: string = argv.source ? (path.isAbsolute(argv.source) ? argv.source : path.resolve(process.cwd(), argv.source)) : defaultSource;
    const outPath: string = argv.out ? (path.isAbsolute(argv.out) ? argv.out : path.resolve(process.cwd(), argv.out)) : path.join(ws.dir, 'NOTICE.md');

    debugLog(isDebug, 'source:', srcPath);
    debugLog(isDebug, 'out:', outPath);

    if (!(await isExist(srcPath))) {
      console.error(`Source file not found: ${srcPath}`);
      process.exit(1);
    }

    const src: string = await fs.readFile(srcPath, 'utf8');

    // collect declared ids from headings for audit
    const declaredIds: ReadonlySet<string> = collectAllHeadingIds(src);

    const entries = parseThirdPartyMarkdown(src);
    debugLog(isDebug, 'parsed entries:', entries.length);

    // Optional upstream NOTICE load
    const finalEntries: ReadonlyArray<TTemplateParsedEntry> = await (async (): Promise<ReadonlyArray<TTemplateParsedEntry>> => {
      if (!argv['include-upstream-notices']) return entries;
      const maxBytes: number = Math.max(1, Math.floor(Number(argv['max-upstream-notice-kb']) || 128)) * 1024;
      const withUpstream = await Promise.all(
        entries.map(async (e: TTemplateParsedEntry) => {
          if (!e.path) return e;
          const u: string | undefined = await loadUpstreamNotice(e.path, maxBytes);
          return u ? { ...e, upstreamNotice: u } : e;
        })
      );
      const filledCount: number = withUpstream.filter((e): boolean => Boolean(e.upstreamNotice)).length;
      debugLog(isDebug, 'upstream notices loaded:', filledCount);
      return withUpstream;
    })();

    // Audit report
    if (argv.audit) {
      const parsedIds = new Set(finalEntries.map((e: TTemplateParsedEntry): string => e.id));
      const missing: ReadonlyArray<string> = Array.from(declaredIds)
        .filter((id: string): boolean => !parsedIds.has(id))
        .toSorted();

      console.log(`NOTICE audit:
  headings in source:  ${declaredIds.size}
  parsed entries:      ${parsedIds.size}
  missing in NOTICE:   ${missing.length}`);

      if (missing.length) {
        console.log(missing.map((x: string): string => `  - ${x}`).join('\n'));
        if (argv.strict) {
          console.error('Audit failed: some entries were not parsed into NOTICE.');
          process.exit(2);
        }
      } else {
        console.log('Audit OK: all entries accounted for.');
      }
    }

    const md: string = renderNotice(ws.name, entries, Boolean(argv['include-upstream-notices']), sourceName);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, md, 'utf8');
    console.log(`NOTICE.md written -> ${outPath}`);
  }

  return { generate };
}
