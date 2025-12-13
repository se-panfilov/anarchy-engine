import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModel3dResourceAsyncRegistry } from '@/Engine/Models3d/Models';

export const Models3dResourceAsyncRegistry = (): TModel3dResourceAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<GLTF>(RegistryType.Model3dRaw));
