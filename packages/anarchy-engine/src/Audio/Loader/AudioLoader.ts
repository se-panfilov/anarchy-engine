import { AbstractLoader, LoaderType } from '@Anarchy/Engine/Abstract';
import type { TAudioLoader, TAudioMetaInfoRegistry, TAudioResourceAsyncRegistry } from '@Anarchy/Engine/Audio/Models';
import { AudioLoader as ThreeAudioLoader } from 'three';

export function AudioLoader(registry: TAudioResourceAsyncRegistry, metaInfoRegistry: TAudioMetaInfoRegistry): TAudioLoader {
  const audioLoader: ThreeAudioLoader = new ThreeAudioLoader();
  return AbstractLoader(audioLoader, registry, metaInfoRegistry, LoaderType.Audio);
}
