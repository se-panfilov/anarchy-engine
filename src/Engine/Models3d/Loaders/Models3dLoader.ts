import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAbstractLoader } from '@/Engine/Abstract';
import { AbstractLoader, LoaderType } from '@/Engine/Abstract';
import type { TModel3dResourceConfig, TModels3dAsyncRegistry, TModels3dLoader } from '@/Engine/Models3d';
import type { TWriteable } from '@/Engine/Utils';

export function Models3dLoader(registry: TModels3dAsyncRegistry): TModels3dLoader {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);

  const loader: TAbstractLoader<GLTF, TModel3dResourceConfig> = AbstractLoader(models3dLoader, registry, LoaderType.Model3d);

  function applyParamsOnLoaded(loaded: TWriteable<GLTF>, options?: TModel3dOptions): GLTF {
    // const loadResult: TModel3dFacade = Model3dFacade({ ...params, model: loaded.scene, animations: loaded.animations }, animationsService);
    return loaded;
  }

  return {
    ...loader,
    loadAsync: (config: TModel3dResourceConfig): Promise<GLTF> => loader.loadAsync(config, applyParamsOnLoaded)
  };
}
