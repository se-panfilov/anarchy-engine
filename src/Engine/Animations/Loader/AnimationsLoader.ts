import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAbstractLoader } from '@/Engine/Abstract';
import { LoaderType } from '@/Engine/Abstract';
import type { TAnimations, TAnimationsLoader, TAnimationsResourceAsyncRegistry, TAnimationsResourceConfig } from '@/Engine/Animations/Models';
import { Loader3dCore } from '@/Engine/Models3d';
import type { TWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function AnimationsLoader(registry: TAnimationsResourceAsyncRegistry): TAnimationsLoader {
  const loader: TAbstractLoader<TAnimations, TAnimationsResourceConfig> = Loader3dCore(registry, LoaderType.Animations);

  //Actually it's always loaded as GLTF, but we want to only animations (so do GLTF | TAnimations to suppress TS error)
  function applyParamsOnLoaded(loaded: TWriteable<GLTF | TAnimations>, options?: TAnimationsResourceConfig['options']): TAnimations {
    console.log('XXX loaded', loaded);
    if (isNotDefined(options)) return (loaded as GLTF).animations;

    return (loaded as GLTF).animations;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
