import type { TAbstractMetaInfoRegistry, TAbstractResourceConfig } from '@Anarchy/Engine/Abstract';

export type TWithResourcesMetaInfoRegistryService<RC extends TAbstractResourceConfig> = Readonly<{
  getMetaInfoRegistry: () => TAbstractMetaInfoRegistry<RC>;
}>;
