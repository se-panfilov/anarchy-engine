import type { TSpaceConfig } from './TSpaceConfig';
import type { TSpaceRegistry } from './TSpaceRegistry';

export type TSpaceFactoryDependencies = Readonly<{
  registry: TSpaceRegistry;
  config?: TSpaceConfig;
}>;
