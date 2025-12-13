import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceHooks } from './TSpaceHooks';

export type TSpaceFactoryDependencies = Readonly<{
  config?: TSpaceConfig;
  hooks?: TSpaceHooks;
}>;
