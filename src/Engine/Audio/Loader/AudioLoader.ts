import { AudioLoader as ThreeAudioLoader } from 'three';

import type { TAbstractLoader } from '@/Engine/Abstract';
import { AbstractLoader, LoaderType } from '@/Engine/Abstract';
import type { TAudioLoader, TAudioResourceAsyncRegistry, TAudioResourceConfig } from '@/Engine/Audio/Models';
import type { TWriteable } from '@/Engine/Utils';

export function AudioLoader(registry: TAudioResourceAsyncRegistry): TAudioLoader {
  // TODO 11.0.0: add loading manager
  const audioLoader: ThreeAudioLoader = new ThreeAudioLoader();
  const loader: TAbstractLoader<AudioBuffer, TAudioResourceConfig> = AbstractLoader(audioLoader, registry, LoaderType.Audio);

  function applyParamsOnLoaded(loaded: TWriteable<AudioBuffer>, options?: TAudioResourceConfig['options']): AudioBuffer {
    console.log('XXX applyParamsOnLoaded', loaded, options);
    // TODO 11.0.0: do we need this? (don't think that buffer actually has any options to adjust)
    return loaded;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
