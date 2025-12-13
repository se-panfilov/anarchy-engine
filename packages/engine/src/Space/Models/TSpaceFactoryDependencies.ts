import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceHooks } from './TSpaceHooks';
import type { TSpaceRegistry } from './TSpaceRegistry';

export type TSpaceFactoryDependencies = Readonly<{
  registry: TSpaceRegistry;
  config?: TSpaceConfig;
  hooks?: TSpaceHooks;
}>;
