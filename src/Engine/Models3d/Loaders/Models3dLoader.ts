import type { Group, Mesh, Object3D } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAbstractLoader } from '@/Engine/Abstract';
import { AbstractLoader, LoaderType } from '@/Engine/Abstract';
import type { TModel3dResourceAsyncRegistry, TModel3dResourceConfig, TModels3dLoader } from '@/Engine/Models3d';
import type { TWriteable } from '@/Engine/Utils';

export function Models3dLoader(registry: TModel3dResourceAsyncRegistry): TModels3dLoader {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);

  // TODO 9.0.0. Does it loads "Group | Mesh | Object3D" or "GLTF"?
  const loader: TAbstractLoader<Group | Mesh | Object3D, TModel3dResourceConfig> = AbstractLoader(models3dLoader, registry, LoaderType.Model3d);

  // function applyParamsOnLoaded(loaded: TWriteable<GLTF>, options?: TModel3dOptions): GLTF {
  function applyParamsOnLoaded(loaded: TWriteable<Group | Mesh | Object3D>): Group | Mesh | Object3D {
    // const loadResult: TModel3dFacade = Model3dFacade({ ...params, model: loaded.scene, animations: loaded.animations }, animationsService);
    return loaded;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
