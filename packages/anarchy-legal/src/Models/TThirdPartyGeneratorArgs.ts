import type { InferredOptionType, Options, PositionalOptions } from 'yargs';

export type TThirdPartyGeneratorArgs = Readonly<{
  root: InferredOptionType<Options | PositionalOptions>;
  workspace: InferredOptionType<Options | PositionalOptions>;
  out: InferredOptionType<Options | PositionalOptions>;
  debug: InferredOptionType<Options | PositionalOptions>;
  includeWorkspaces: InferredOptionType<Options | PositionalOptions>;
  'include-workspaces': InferredOptionType<Options | PositionalOptions>;
  includeWorkspaceSelf: InferredOptionType<Options | PositionalOptions>;
  'include-workspace-self': InferredOptionType<Options | PositionalOptions>;
}>;
