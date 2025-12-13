import type { TAbstractMetaInfoRegistry, TAbstractResourceConfig } from '@/Abstract';

export type TWithResourcesMetaInfoRegistryService<RC extends TAbstractResourceConfig> = Readonly<{
  getMetaInfoRegistry: () => TAbstractMetaInfoRegistry<RC>;
}>;
