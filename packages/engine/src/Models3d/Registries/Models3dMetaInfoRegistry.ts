import { AbstractSimpleRegistry, RegistryType } from '@/Abstract';
import type { TModel3dResourceConfig, TModels3dMetaInfoRegistry } from '@/Models3d/Models';

export function Models3dMetaInfoRegistry(): TModels3dMetaInfoRegistry {
  return AbstractSimpleRegistry<TModel3dResourceConfig>(RegistryType.Model3dMetaInfo);
}
