import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import { LoaderType } from '@/Abstract';
import type { TAnimations, TAnimationsLoader, TAnimationsMetaInfoRegistry, TAnimationsResourceAsyncRegistry, TAnimationsResourceConfig } from '@/Animations/Models';
import { Loader3dCore } from '@/Models3d';
import type { TWriteable } from '@/Utils';
import { isNotDefined } from '@/Utils';

export function AnimationsLoader(registry: TAnimationsResourceAsyncRegistry, metaInfoRegistry: TAnimationsMetaInfoRegistry): TAnimationsLoader {
  const loader: TAnimationsLoader = Loader3dCore(registry, metaInfoRegistry, LoaderType.Animations);

  //Actually, it's always loaded as GLTF, but we want to only animations (so do GLTF | TAnimations to suppress TS error)
  function applyParamsOnLoaded(loaded: TWriteable<GLTF | TAnimations>, options?: TAnimationsResourceConfig['options']): TAnimations {
    if (isNotDefined(options)) return (loaded as GLTF).animations;

    return (loaded as GLTF).animations;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
