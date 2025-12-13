import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TAnarchyLegalConfig, TLegalDocumentType, TLegalFilesService, TLegalFilesUtilsService, TRepoUtilsService, TTemplateGeneratorOptions, TWorkspaceInfo } from '@Anarchy/Legal'; // eslint-disable-next-line spellcheck/spell-checker
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { LegalDocumentType } from '../Constants/LegalDocumentType.ts';
import { LegalFilesUtilsService } from './LegalFilesUtilsService.ts';
import { RepoUtilsService } from './RepoUtilsService.ts';

export function LegalFilesService(): TLegalFilesService {
  let isDebug: boolean = false;
  const repoUtilsService: TRepoUtilsService = RepoUtilsService();
  const legalFilesUtilsService: TLegalFilesUtilsService = LegalFilesUtilsService(repoUtilsService);
  const { debugLog, findMonorepoRoot, resolveWorkspaceFromArg, loadWorkspaces } = repoUtilsService;
  const { assertTemplatesPresent, getConfiguredDocKeys, generateAll, readConfig } = legalFilesUtilsService;

  const options: TTemplateGeneratorOptions = {
    templateExtension: '.md',
    defaultTemplateBaseName: (docType: TLegalDocumentType): string => `${docType}_TEMPLATE`
  };

  async function generate(): Promise<void> {
    // eslint-disable-next-line spellcheck/spell-checker
    const argv = await yargs(hideBin(process.argv))
      // .scriptName('anarchy-legal:files')
      .usage('$0 --workspace <name|path> --out <dir> [--templates <dir>] [--types DISCLAIMER,EULA,...] [--debug]')
      .option('workspace', { type: 'string', demandOption: true, describe: 'Target workspace (name or path relative to monorepo root)' })
      .option('out', { type: 'string', demandOption: true, describe: 'Output directory for generated files (relative to current working dir allowed)' })
      .option('templates', { type: 'string', describe: 'Templates directory. Default: packages/anarchy-legal/templates' })
      .option('types', { type: 'string', describe: `Comma-separated list of doc types. Default: ${Object.values(LegalDocumentType).join(',')}` })
      .option('debug', { type: 'boolean', default: false })
      .help()
      .parseAsync();

    isDebug = Boolean(argv.debug);
    repoUtilsService.setDebugMode(isDebug);

    const scriptDir: string = path.dirname(fileURLToPath(import.meta.url));
    const startCandidates: string[] = [process.env.INIT_CWD, process.cwd(), scriptDir].filter(Boolean) as string[];

    // Find monorepo root
    const rootDir: string | undefined = await startCandidates.reduce<Promise<string | undefined>>(async (accP, c) => {
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

    // Load workspaces and resolve target
    const workspaces: ReadonlyMap<string, TWorkspaceInfo> = await loadWorkspaces(rootDir);
    const ws = await resolveWorkspaceFromArg(String(argv.workspace), workspaces, rootDir);
    debugLog(isDebug, 'target workspace:', ws.name, ws.dir);

    // Resolve templates dir
    const templatesDir: string = argv.templates ? (path.isAbsolute(argv.templates) ? argv.templates : path.resolve(process.cwd(), argv.templates)) : path.resolve(scriptDir, '../../src/Templates');
    debugLog(isDebug, 'templates dir:', templatesDir);

    // Resolve out dir
    const outDir: string = path.isAbsolute(argv.out as string) ? (argv.out as string) : path.resolve(process.cwd(), String(argv.out));
    debugLog(isDebug, 'out dir:', outDir);

    const config: TAnarchyLegalConfig = await readConfig(ws.dir);
    const configKeys: ReadonlyArray<string> = Array.from(getConfiguredDocKeys(config));

    if (!configKeys.length) {
      console.log('Nothing to generate: no doc types configured (or filtered out by --types).');
      return;
    }

    const cliKeys: ReadonlySet<string> = ((): Set<string> => {
      if (!argv.types) return new Set(configKeys);
      const parts: ReadonlyArray<string> = String(argv.types)
        .split(',')
        .map((s: string): string => s.trim())
        .filter(Boolean);
      const ok = new Set(configKeys);
      return new Set(parts.filter((p: string): boolean => ok.has(p)));
    })();

    if (!cliKeys.size) {
      console.log('Nothing to generate: all requested sections were filtered out or missing in config.');
      return;
    }

    assertTemplatesPresent(config, cliKeys);

    // Go
    await generateAll({ ws, outDir, templatesDir, keys: cliKeys, config }, options);
  }

  return { generate };
}
