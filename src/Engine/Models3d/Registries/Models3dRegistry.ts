import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TModel3d, TModels3dRegistry } from '@/Engine/Models3d/Models';

export const Models3dRegistry = (): TModels3dRegistry => AbstractEntityRegistry<TModel3d>(RegistryType.Model3d);
