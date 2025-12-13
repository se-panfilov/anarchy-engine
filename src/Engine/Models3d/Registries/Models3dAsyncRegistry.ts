import type { Group, Mesh } from 'three';

import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModels3dAsyncRegistry } from '@/Engine/Models3d/Models';

export const Models3dAsyncRegistry = (): TModels3dAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<Mesh | Group>(RegistryType.Model3d));
