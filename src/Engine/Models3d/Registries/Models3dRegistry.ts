import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModel3dFacade, TModel3dRegistry } from '@/Engine/Models3d/Models';

export const Models3dRegistry = (): TModel3dRegistry => RegistryFacade(AbstractEntityRegistry<TModel3dFacade>(RegistryType.Model3dFacade));
