import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import type { TAbstractLoader } from '@/Engine/Abstract';
import { LoaderType } from '@/Engine/Abstract';
import type { TAnimationsResourceAsyncRegistry, TAnimationsResourceConfig } from '@/Engine/Animations/Models';
import type { TModels3dLoader } from '@/Engine/Models3d';
import { Loader3dCore } from '@/Engine/Models3d';
import type { TWriteable } from '@/Engine/Utils';
import { isNotDefined } from '@/Engine/Utils';

export function AnimationsLoader(registry: TAnimationsResourceAsyncRegistry): TModels3dLoader {
  const loader: TAbstractLoader<GLTF, TAnimationsResourceConfig> = Loader3dCore(registry, LoaderType.Animations);

  function applyParamsOnLoaded(loaded: TWriteable<GLTF>, options?: TAnimationsResourceConfig['options']): GLTF {
    if (isNotDefined(options)) return loaded;
    // TODO 9.4.0. Animations: shall we do anything here?

    return loaded;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
