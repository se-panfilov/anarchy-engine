import { AbstractEntityAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModel3dFacade, TModels3dAsyncRegistry } from '@/Engine/Models3d/Models';

export const Models3dAsyncRegistry = (): TModels3dAsyncRegistry => RegistryFacade(AbstractEntityAsyncRegistry<TModel3dFacade>(RegistryType.Model3d));
