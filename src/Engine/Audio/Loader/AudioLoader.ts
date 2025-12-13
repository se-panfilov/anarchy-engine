import { AudioLoader as ThreeAudioLoader } from 'three';

import { AbstractLoader, LoaderType } from '@/Engine/Abstract';
import type { TAudioLoader, TAudioResourceAsyncRegistry } from '@/Engine/Audio/Models';

export function AudioLoader(registry: TAudioResourceAsyncRegistry): TAudioLoader {
  // TODO 11.0.0: add loading manager
  const audioLoader: ThreeAudioLoader = new ThreeAudioLoader();
  return AbstractLoader(audioLoader, registry, LoaderType.Audio);
}
