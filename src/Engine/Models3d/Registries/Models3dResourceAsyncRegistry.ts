import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TModels3dResourceAsyncRegistry } from '@/Engine/Models3d/Models';

export const Models3dResourceAsyncRegistry = (): TModels3dResourceAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<GLTF>(RegistryType.Model3dRaw));
