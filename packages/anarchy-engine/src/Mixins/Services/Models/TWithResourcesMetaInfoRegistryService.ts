import type { TAbstractMetaInfoRegistry, TAbstractResourceConfig } from '@hellpig/anarchy-engine/Abstract';

export type TWithResourcesMetaInfoRegistryService<RC extends TAbstractResourceConfig> = Readonly<{
  getMetaInfoRegistry: () => TAbstractMetaInfoRegistry<RC>;
}>;
