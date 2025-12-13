import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { AbstractResourceAsyncRegistry, RegistryType } from '@/Abstract';
import type { TModels3dResourceAsyncRegistry } from '@/Models3d/Models';

export function Models3dResourceAsyncRegistry(): TModels3dResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<GLTF>(RegistryType.Model3dRaw);
}
