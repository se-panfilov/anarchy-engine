import { AbstractEntityRegistry, RegistryType } from '@/Abstract';
import type { TModel3d, TModels3dRegistry } from '@/Models3d/Models';

export function Models3dRegistry(): TModels3dRegistry {
  return AbstractEntityRegistry<TModel3d>(RegistryType.Model3d);
}
