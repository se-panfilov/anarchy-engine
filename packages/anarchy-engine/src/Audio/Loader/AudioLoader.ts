import { AbstractLoader, LoaderType } from '@hellpig/anarchy-engine/Abstract';
import type { TAudioLoader, TAudioMetaInfoRegistry, TAudioResourceAsyncRegistry } from '@hellpig/anarchy-engine/Audio/Models';
import type { TLoadingManagerWrapper } from '@hellpig/anarchy-engine/LoadingManager';
import { AudioLoader as ThreeAudioLoader } from 'three';

export function AudioLoader(registry: TAudioResourceAsyncRegistry, metaInfoRegistry: TAudioMetaInfoRegistry, loadingManagerWrapper: TLoadingManagerWrapper): TAudioLoader {
  const audioLoader: ThreeAudioLoader = new ThreeAudioLoader(loadingManagerWrapper.entity);
  return AbstractLoader(audioLoader, registry, metaInfoRegistry, LoaderType.Audio);
}
