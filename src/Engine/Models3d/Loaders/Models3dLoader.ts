import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAbstractLoader } from '@/Engine/Abstract';
import { AbstractLoader, LoaderType } from '@/Engine/Abstract';
import type { TModel3dResourceAsyncRegistry, TModel3dResourceConfig, TModels3dLoader } from '@/Engine/Models3d';
import { applyObject3dParamsToModel3d, applyPositionToModel3d, applyRotationToModel3d, applyScaleToModel3d } from '@/Engine/Models3d';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function Models3dLoader(registry: TModel3dResourceAsyncRegistry): TModels3dLoader {
  const models3dLoader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/three/examples/jsm/libs/draco/');
  dracoLoader.setDecoderConfig({ type: 'wasm' });
  dracoLoader.preload();
  models3dLoader.setDRACOLoader(dracoLoader);

  const loader: TAbstractLoader<GLTF, TModel3dResourceConfig> = AbstractLoader(models3dLoader, registry, LoaderType.Model3d);

  function applyParamsOnLoaded(loaded: TWriteable<GLTF>, options?: TModel3dResourceConfig['options']): GLTF {
    if (isNotDefined(options)) return loaded;
    loaded.scenes.forEach((scene): void => applyObject3dParamsToModel3d(scene, options));

    if (isDefined(options.scale?.x) && isDefined(options.scale?.y) && isDefined(options.scale?.z)) applyScaleToModel3d(loaded.scene, options.scale);
    if (isDefined(options.position?.x) && isDefined(options.position?.y) && isDefined(options.position?.z)) applyPositionToModel3d(loaded.scene, options.position);
    if (isDefined(options.rotation?.x) && isDefined(options.rotation?.y) && isDefined(options.rotation?.z)) applyRotationToModel3d(loaded.scene, options.rotation);

    return loaded;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
