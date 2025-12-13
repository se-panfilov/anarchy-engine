import { LoaderType } from '@Engine/Abstract';
import type { TAnimations, TAnimationsLoader, TAnimationsMetaInfoRegistry, TAnimationsResourceAsyncRegistry, TAnimationsResourceConfig } from '@Engine/Animations/Models';
import { Loader3dCore } from '@Engine/Models3d';
import type { TDracoLoaderSettings } from '@Engine/ThreeLib';
import type { TWriteable } from '@Engine/Utils';
import { isNotDefined } from '@Engine/Utils';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export function AnimationsLoader(registry: TAnimationsResourceAsyncRegistry, metaInfoRegistry: TAnimationsMetaInfoRegistry, settings: TDracoLoaderSettings = {}): TAnimationsLoader {
  const loader: TAnimationsLoader = Loader3dCore(registry, metaInfoRegistry, LoaderType.Animations, settings);

  //Actually, it's always loaded as GLTF, but we want to only animations (so do GLTF | TAnimations to suppress TS error)
  function applyParamsOnLoaded(loaded: TWriteable<GLTF | TAnimations>, options?: TAnimationsResourceConfig['options']): TAnimations {
    if (isNotDefined(options)) return (loaded as GLTF).animations;

    return (loaded as GLTF).animations;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
