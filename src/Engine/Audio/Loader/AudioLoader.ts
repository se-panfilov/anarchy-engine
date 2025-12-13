import { AudioLoader as ThreeAudioLoader } from 'three';

import { AbstractLoader, LoaderType } from '@/Engine/Abstract';
import type { TAudioLoader, TAudioResourceAsyncRegistry } from '@/Engine/Audio/Models';

export function AudioLoader(registry: TAudioResourceAsyncRegistry): TAudioLoader {
  const audioLoader: ThreeAudioLoader = new ThreeAudioLoader();
  return AbstractLoader(audioLoader, registry, LoaderType.Audio);
}
