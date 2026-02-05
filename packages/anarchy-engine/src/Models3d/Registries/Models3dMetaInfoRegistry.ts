import { AbstractSimpleRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TModel3dResourceConfig, TModels3dMetaInfoRegistry } from '@hellpig/anarchy-engine/Models3d/Models';

export function Models3dMetaInfoRegistry(): TModels3dMetaInfoRegistry {
  return AbstractSimpleRegistry<TModel3dResourceConfig>(RegistryType.Model3dMetaInfo);
}
