import { AbstractResourceAsyncRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TModels3dResourceAsyncRegistry } from '@Anarchy/Engine/Models3d/Models';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export function Models3dResourceAsyncRegistry(): TModels3dResourceAsyncRegistry {
  return AbstractResourceAsyncRegistry<GLTF>(RegistryType.Model3dRaw);
}
