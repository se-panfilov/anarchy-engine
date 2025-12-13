import { LoaderType } from '@Anarchy/Engine/Abstract';
import type { TModel3dResourceConfig, TModels3dLoader, TModels3dMetaInfoRegistry, TModels3dResourceAsyncRegistry } from '@Anarchy/Engine/Models3d';
import { applyObject3dParamsToModel3d, applyPositionToModel3d, applyRotationToModel3d, applyScaleToModel3d } from '@Anarchy/Engine/Models3d/Utils';
import type { TDracoLoaderSettings } from '@Anarchy/Engine/ThreeLib';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import { isDefined, isNotDefined } from '@Anarchy/Shared/Utils';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { Loader3dCore } from './Loader3dCore';

export function Models3dLoader(registry: TModels3dResourceAsyncRegistry, metaInfoRegistry: TModels3dMetaInfoRegistry, settings: TDracoLoaderSettings = {}): TModels3dLoader {
  const loader: TModels3dLoader = Loader3dCore(registry, metaInfoRegistry, LoaderType.Model3d, settings);

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
