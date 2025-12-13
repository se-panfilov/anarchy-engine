import type { Group, Mesh, Object3D } from 'three';

import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModel3dResourceAsyncRegistry } from '@/Engine/Models3d/Models';

export const Models3dResourceAsyncRegistry = (): TModel3dResourceAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<Group | Mesh | Object3D>(RegistryType.Model3d));
