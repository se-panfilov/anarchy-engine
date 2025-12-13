import type { TAbstractMetaInfoRegistry, TAbstractResourceConfig } from '@/Engine/Abstract';

export type TWithResourcesMetaInfoRegistryService<RC extends TAbstractResourceConfig> = Readonly<{
  getMetaInfoRegistry: () => TAbstractMetaInfoRegistry<RC>;
}>;
