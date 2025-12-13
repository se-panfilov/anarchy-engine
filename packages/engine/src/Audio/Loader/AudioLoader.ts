import { AudioLoader as ThreeAudioLoader } from 'three';

import { AbstractLoader, LoaderType } from '@/Abstract';
import type { TAudioLoader, TAudioMetaInfoRegistry, TAudioResourceAsyncRegistry } from '@/Audio/Models';

export function AudioLoader(registry: TAudioResourceAsyncRegistry, metaInfoRegistry: TAudioMetaInfoRegistry): TAudioLoader {
  const audioLoader: ThreeAudioLoader = new ThreeAudioLoader();
  return AbstractLoader(audioLoader, registry, metaInfoRegistry, LoaderType.Audio);
}
