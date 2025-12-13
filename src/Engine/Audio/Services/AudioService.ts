import type { Subscription } from 'rxjs';
import { AudioListener } from 'three';

import { Listeners } from '@/Engine/Audio/Constants';
import { AudioLoader } from '@/Engine/Audio/Loader';
import type {
  TAnyAudioConfig,
  TAnyAudioParams,
  TAnyAudioWrapper,
  TAudioFactory,
  TAudioListenersRegistry,
  TAudioLoader,
  TAudioRegistry,
  TAudioResourceAsyncRegistry,
  TAudioService
} from '@/Engine/Audio/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSpaceLoops } from '@/Engine/Space';

// TODO 11.0.0: Implement "Sound Perception Manager" for NPCs to react to a sound (if they are in a radius)
export function AudioService(
  factory: TAudioFactory,
  registry: TAudioRegistry,
  audioResourceAsyncRegistry: TAudioResourceAsyncRegistry,
  audioListenersRegistry: TAudioListenersRegistry,
  { audioLoop }: TSpaceLoops
): TAudioService {
  const audioLoader: TAudioLoader = AudioLoader(audioResourceAsyncRegistry);
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAnyAudioWrapper): void => registry.add(wrapper));

  // Currently we have only one listener, but more could be added in the future
  audioListenersRegistry.add(Listeners.Main, new AudioListener());

  const create = (params: TAnyAudioParams): TAnyAudioWrapper => factory.create(params, { audioLoop });
  const createFromConfig = (models3d: ReadonlyArray<TAnyAudioConfig>): ReadonlyArray<TAnyAudioWrapper> =>
    models3d.map((config: TAnyAudioConfig): TAnyAudioWrapper => create(factory.configToParams(config, { audioResourceAsyncRegistry, audioListenersRegistry })));

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    factorySub$.unsubscribe();

    registry.destroy$.next();
    // TODO DESTROY: We need a way to unload audio
    audioResourceAsyncRegistry.destroy$.next();
  });

  return {
    getFactory: (): TAudioFactory => factory,
    getRegistry: (): TAudioRegistry => registry,
    getResourceRegistry: (): TAudioResourceAsyncRegistry => audioResourceAsyncRegistry,
    getListenersRegistry: (): TAudioListenersRegistry => audioListenersRegistry,
    getMainListener: (): AudioListener | undefined => audioListenersRegistry.findByKey(Listeners.Main),
    create,
    createFromConfig,
    loadAsync: audioLoader.loadAsync,
    loadFromConfigAsync: audioLoader.loadFromConfigAsync,
    ...destroyable
  };
}
