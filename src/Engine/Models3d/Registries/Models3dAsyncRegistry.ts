import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModel3dFacade, TModels3dAsyncRegistry } from '@/Engine/Models3d/Models';

export const Models3dAsyncRegistry = (): TModels3dAsyncRegistry => RegistryFacade(AbstractEntityRegistry<TModel3dFacade>(RegistryType.Model3d));
