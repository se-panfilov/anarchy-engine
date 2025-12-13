import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TCollected, TDependencyNode, TLicenseEntry, TRepoUtilsService, TRootInfo, TThirdPartyGeneratorArgs, TThirdPartyLicensesService } from '@Anarchy/Legal/Models';
// eslint-disable-next-line spellcheck/spell-checker
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { RepoUtilsService } from './RepoUtilsService.ts';

export function ThirdPartyLicensesService(): TThirdPartyLicensesService {
  let isDebug: boolean = false;
  const repoUtilsService: TRepoUtilsService = RepoUtilsService();

  const {
    assertNoCycles,
    buildLicenseEntries,
    buildWorkspaceLicenseEntries,
    buildWsGraph,
    collectExternalSeedNames,
    collectThirdPartyMap,
    collectWorkspaceClosure,
    debugLog,
    fillMissingInstallPaths,
    findMonorepoRoot,
    loadRoot,
    npmLsJson,
    renderMarkdown,
    resolveWorkspaceFromArg
  } = repoUtilsService;

  function getStartCandidates(argv: TThirdPartyGeneratorArgs): ReadonlyArray<string> {
    const scriptDir: string = path.dirname(fileURLToPath(import.meta.url));
    return [argv.root as string | undefined, process.env.INIT_CWD, process.cwd(), scriptDir].filter(Boolean) as string[];
  }

  function getMonorepoRoot(startCandidates: ReadonlyArray<string>): Promise<string | undefined> {
    return startCandidates.reduce<Promise<string | undefined>>(async (prev, c) => {
      const acc: string | undefined = await prev;
      if (acc) return acc;
      try {
        const found: string = await findMonorepoRoot(c);
        debugLog(isDebug, 'monorepo root picked:', found, '(from', c + ')');
        return found;
      } catch (e) {
        debugLog(isDebug, 'no root from', c, ':', (e as Error).message);
        return undefined;
      }
    }, Promise.resolve<string | undefined>(undefined));
  }

  async function getWorkspaceEntries(argv: TThirdPartyGeneratorArgs, wsName: string, closure: ReadonlySet<string>, root: TRootInfo): Promise<ReadonlyArray<TLicenseEntry>> {
    let wsEntries: ReadonlyArray<TLicenseEntry> = [];
    if (argv['include-workspaces'] !== false) {
      wsEntries = await buildWorkspaceLicenseEntries(
        closure,
        root.workspaces,
        argv['include-workspace-self'] ? undefined : wsName // exclude self
      );
    }
    return wsEntries;
  }

  function getEmptyNote(sorted: ReadonlyArray<TLicenseEntry>, seedNames: ReadonlySet<string>): string | undefined {
    if (sorted.length !== 0) return undefined;
    const noSeeds: boolean = seedNames.size === 0;
    return noSeeds
      ? 'This workspace declares no production dependencies and has no reachable internal workspaces. Therefore, there are no third-party licenses to list.'
      : 'There are no third-party production dependencies reachable from this workspace. Therefore, there are no third-party licenses to list.';
  }

  async function writeResultFile(outPath: string, wsName: string, sorted: ReadonlyArray<TLicenseEntry>, emptyNote: string | undefined): Promise<void> {
    const resultFile: string = renderMarkdown(wsName, sorted, emptyNote);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, resultFile, 'utf8');
    console.log(`The result file written to: ${outPath}`);
  }

  async function generate(): Promise<void> {
    // eslint-disable-next-line spellcheck/spell-checker
    const argv: TThirdPartyGeneratorArgs = await yargs(hideBin(process.argv))
      // .scriptName('anarchy-legal')
      .usage('$0 --workspace <name|path> --out <file> [--root <dir>] [--debug] [--no-include-workspaces]')
      .option('root', {
        type: 'string',
        describe: 'Starting directory to search for monorepo root. If omitted, uses INIT_CWD, then process.cwd(), then script dir.'
      })
      .option('workspace', {
        type: 'string',
        demandOption: true,
        describe: 'Target workspace (name from package.json or folder path relative to monorepo root)'
      })
      .option('out', {
        type: 'string',
        demandOption: true,
        describe: 'Output path for the result file (relative to current working dir)'
      })
      .option('debug', {
        type: 'boolean',
        default: false,
        describe: 'Print verbose diagnostic information'
      })
      .option('include-workspaces', {
        type: 'boolean',
        default: true,
        describe: 'Also include licenses of reachable internal workspaces (excluding self by default)'
      })
      .option('include-workspace-self', {
        type: 'boolean',
        default: false,
        describe: 'Also include license of the target workspace itself'
      })
      .help()
      .parseAsync();

    isDebug = Boolean(argv.debug);
    repoUtilsService.setDebugMode(isDebug);

    // 1) Determine start points
    const startCandidates: ReadonlyArray<string> = getStartCandidates(argv);
    debugLog(isDebug, 'start candidates:', startCandidates);

    // 2) Find monorepo root
    const monorepoRoot: string | undefined = await getMonorepoRoot(startCandidates);
    if (!monorepoRoot) throw new Error(`Failed to locate monorepo root from candidates: ${startCandidates.join(', ')}`);

    // 3) Load root + workspaces
    const root = await loadRoot(monorepoRoot);
    debugLog(isDebug, 'rootDir:', root.rootDir);

    // 4) Resolve workspace
    const { name, dir } = resolveWorkspaceFromArg(argv.workspace as string, root.workspaces, root.rootDir);
    debugLog(isDebug, 'target workspace:', name, 'dir:', dir);

    // 5) Cycle check
    const graph: ReadonlyMap<string, ReadonlySet<string>> = buildWsGraph(root.workspaces);
    assertNoCycles(graph, name);

    // 6) Workspace closure and seeds
    const closure: ReadonlySet<string> = collectWorkspaceClosure(graph, name);
    const wsNamesSet: ReadonlySet<string> = new Set(root.workspaces.keys());
    const seedNames: ReadonlySet<string> = collectExternalSeedNames(closure, root.workspaces, wsNamesSet);
    debugLog(isDebug, 'workspace closure size:', closure.size, 'seed external deps:', seedNames.size, 'sample:', [...seedNames].slice(0, 10));

    // 7) Resolved prod tree
    const tree: TDependencyNode | undefined = await npmLsJson(root.rootDir, name);

    // 8) Collect external packages WITH paths (seed-filtered)
    const thirdPartyMap: Map<string, TCollected> = new Map(collectThirdPartyMap(tree, wsNamesSet, seedNames));
    fillMissingInstallPaths(thirdPartyMap, name, root.rootDir);

    if (thirdPartyMap.size === 0) debugLog(isDebug, `[info] No third-party prod deps reachable from seeds.`);
    else if (isDebug) console.log('[debug] examples (third-party):', [...thirdPartyMap.values()].slice(0, 5));

    // 9) Workspace licenses (excluding self by default)
    const wsEntries: ReadonlyArray<TLicenseEntry> = await getWorkspaceEntries(argv, name, closure, root);
    debugLog(isDebug, 'workspace license entries (after self-filter):', wsEntries.length);

    // 10) Third-party licenses
    const thirdEntries: ReadonlyArray<TLicenseEntry> = await buildLicenseEntries(thirdPartyMap);
    debugLog(isDebug, 'third-party license entries:', thirdEntries.length);

    // 11) Merge & write
    const merged: ReadonlyArray<TLicenseEntry> = [...wsEntries, ...thirdEntries];
    const sorted: ReadonlyArray<TLicenseEntry> = [...merged].sort((a, b) => (a.name === b.name ? a.version.localeCompare(b.version) : a.name.localeCompare(b.name)));

    const outPath: string = path.isAbsolute(argv.out as string) ? (argv.out as string) : path.join(process.cwd(), argv.out as string);

    const emptyNote: string | undefined = getEmptyNote(sorted, seedNames);

    debugLog(isDebug, 'write output to:', outPath, 'total entries:', sorted.length);

    await writeResultFile(outPath, name, sorted, emptyNote);
  }

  return { generate };
}
