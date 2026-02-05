import { AbstractResourceAsyncRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TModels3dResourceAsyncRegistry } from '@hellpig/anarchy-engine/Models3d/Models';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export function Models3dResourceAsyncRegistry(): TModels3dResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<GLTF>(RegistryType.Model3dRaw);
}
