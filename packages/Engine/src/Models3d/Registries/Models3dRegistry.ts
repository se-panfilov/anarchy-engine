import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TModel3d, TModels3dRegistry } from '@/Engine/Models3d/Models';

export function Models3dRegistry(): TModels3dRegistry {
  return AbstractEntityRegistry<TModel3d>(RegistryType.Model3d);
}
