import { AbstractLoader, LoaderType } from '@Anarchy/Engine/Abstract';
import type { TAudioLoader, TAudioMetaInfoRegistry, TAudioResourceAsyncRegistry } from '@Anarchy/Engine/Audio/Models';
import type { TLoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager';
import { AudioLoader as ThreeAudioLoader } from 'three';

export function AudioLoader(registry: TAudioResourceAsyncRegistry, metaInfoRegistry: TAudioMetaInfoRegistry, loadingManagerWrapper: TLoadingManagerWrapper): TAudioLoader {
  const audioLoader: ThreeAudioLoader = new ThreeAudioLoader(loadingManagerWrapper.entity);
  return AbstractLoader(audioLoader, registry, metaInfoRegistry, LoaderType.Audio);
}
