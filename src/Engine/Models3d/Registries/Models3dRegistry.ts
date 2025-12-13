import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModel3d, TModel3dRegistry } from '@/Engine/Models3d/Models';

export const Models3dRegistry = (): TModel3dRegistry => RegistryFacade(AbstractEntityRegistry<TModel3d>(RegistryType.Model3dFacade));
