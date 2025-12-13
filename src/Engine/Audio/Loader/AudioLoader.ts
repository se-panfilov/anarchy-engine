import type { Howl } from 'howler';

import type { TAbstractLoader } from '@/Engine/Abstract';
import { AbstractLoader, LoaderType } from '@/Engine/Abstract';
import type { TAudioLoader, TAudioResourceAsyncRegistry, TAudioResourceConfig } from '@/Engine/Audio/Models';
import type { TWriteable } from '@/Engine/Utils';

export function AudioLoader(registry: TAudioResourceAsyncRegistry): TAudioLoader {
  const audioLoader: RGBELoader = new RGBELoader();
  const loader: TAbstractLoader<Howl, TAudioResourceConfig> = AbstractLoader(audioLoader, registry, LoaderType.Audio);

  function applyParamsOnLoaded(loaded: TWriteable<Howl>, options?: TAudioResourceConfig['options']): Howl {
    // TODO 11.0.0: do we need this?

    //     const sound = new Howl({
    //       src: [src],
    //       loop: options.loop || false,
    //       volume: options.volume || 1.0
    //     });
    //
    //     sounds.set(name, sound);
    return loaded;
  }

  loader.setOnLoadedFn(applyParamsOnLoaded);

  return loader;
}
