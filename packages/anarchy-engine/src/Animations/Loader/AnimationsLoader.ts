import { LoaderType } from '@Anarchy/Engine/Abstract';
import type { TAnimations, TAnimationsLoader, TAnimationsMetaInfoRegistry, TAnimationsResourceAsyncRegistry, TAnimationsResourceConfig } from '@Anarchy/Engine/Animations/Models';
import type { TLoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager';
import { Loader3dCore } from '@Anarchy/Engine/Models3d';
import type { TDracoLoaderSettings } from '@Anarchy/Engine/ThreeLib';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import { isNotDefined } from '@Anarchy/Shared/Utils';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export function AnimationsLoader(
  registry: TAnimationsResourceAsyncRegistry,
  metaInfoRegistry: TAnimationsMetaInfoRegistry,
  loadingManagerWrapper: TLoadingManagerWrapper,
  settings: TDracoLoaderSettings = {}
): TAnimationsLoader {
  const loader: TAnimationsLoader = Loader3dCore(registry, metaInfoRegistry, LoaderType.Animations, loadingManagerWrapper, settings);

  //Actually, it's always loaded as GLTF, but we want to only animations (so do GLTF | TAnimations to suppress TS error)
  function applyParamsOnLoaded(loaded: TWriteable<GLTF | TAnimations>, options?: TAnimationsResourceConfig['options']): TAnimations {
    if (isNotDefined(options)) return (loaded as GLTF).animations;

    return (loaded as GLTF).animations;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
