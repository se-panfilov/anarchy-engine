import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { AbstractSimpleAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TModels3dResourceAsyncRegistry } from '@/Engine/Models3d/Models';

// TODO 15-0-0: CWP: make models3d serializable (all resources must save an "url" somewhere, so we can use it for serialization)
// export const Models3dResourceAsyncRegistry = (): TModels3dResourceAsyncRegistry => AbstractSimpleAsyncRegistry<GLTF>(RegistryType.Model3dRaw);
export const Models3dResourceAsyncRegistry = (): TModels3dResourceAsyncRegistry => {
  const registry = AbstractSimpleAsyncRegistry<GLTF>(RegistryType.Model3dRaw);

  // TODO 15-0-0: fix any
  // eslint-disable-next-line functional/immutable-data
  registry.serialize = (dependencies?: Record<string, any> | undefined): void => {
    // return map((value: T): S => {

    console.log('XXX Specific serialize', dependencies);

    // TODO 15-0-0: fix any
    return registry.map((value: GLTF): ReadonlyArray<any> => {
      console.log('XXX1', value);
      // if (isDefined(value.serialize)) return value.serialize(dependencies as D);

      return value;
    });
  };

  return registry;
};
