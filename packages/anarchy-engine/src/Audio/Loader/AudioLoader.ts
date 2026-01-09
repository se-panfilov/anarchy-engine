import { AbstractLoader, LoaderType } from '@Anarchy/Engine/Abstract';
import type { TAudioLoader, TAudioMetaInfoRegistry, TAudioResourceAsyncRegistry } from '@Anarchy/Engine/Audio/Models';
import type { LoadingManager } from 'three';
import { AudioLoader as ThreeAudioLoader } from 'three';

export function AudioLoader(registry: TAudioResourceAsyncRegistry, metaInfoRegistry: TAudioMetaInfoRegistry, loadingManager: LoadingManager): TAudioLoader {
  const audioLoader: ThreeAudioLoader = new ThreeAudioLoader(loadingManager);
  return AbstractLoader(audioLoader, registry, metaInfoRegistry, LoaderType.Audio);
}
