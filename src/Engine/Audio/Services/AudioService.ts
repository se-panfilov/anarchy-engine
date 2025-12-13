import type { Subscription } from 'rxjs';
import { AudioListener } from 'three';

import { Listeners } from '@/Engine/Audio/Constants';
import { AudioLoader } from '@/Engine/Audio/Loader';
import type {
  TAudioConfig,
  TAudioFactory,
  TAudioListenersRegistry,
  TAudioLoader,
  TAudioParams,
  TAudioRegistry,
  TAudioResourceAsyncRegistry,
  TAudioService,
  TAudioWrapper
} from '@/Engine/Audio/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { TSpaceLoops } from '@/Engine/Space';

// TODO 11.0.0: Load all audio resources in Space (during config build)
// TODO 11.0.0: Fix type TAudioService
// TODO 11.0.0: How to upload a sound and reuse it?
// TODO 11.0.0: Upload async
// TODO 11.0.0: Upload from config
// TODO 11.0.0: Add effects to a sound
// TODO 11.0.0: Add debug render (position, radius, etc)
// TODO 11.0.0: Add Audio loop (to update 3d sounds, when position changes, but not more often than with tick$)
// TODO 11.0.0: Implement "Sound Perception Manager" for NPCs to react to a sound (if they are in a radius)
// TODO 11.0.0: Optionally implement raycast sound (if a sound is blocked by an object)
export function AudioService(
  factory: TAudioFactory,
  registry: TAudioRegistry,
  audioResourceAsyncRegistry: TAudioResourceAsyncRegistry,
  audioListenersRegistry: TAudioListenersRegistry,
  { audioLoop }: TSpaceLoops
): TAudioService {
  const audioLoader: TAudioLoader = AudioLoader(audioResourceAsyncRegistry);
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAudioWrapper): void => registry.add(wrapper));

  // Currently we have only one listener, but more could be added in the future
  audioListenersRegistry.add(Listeners.Main, new AudioListener());

  const create = (params: TAudioParams): TAudioWrapper => factory.create(params, { audioLoop });
  const createFromConfig = (models3d: ReadonlyArray<TAudioConfig>): ReadonlyArray<TAudioWrapper> =>
    models3d.map((config: TAudioConfig): TAudioWrapper => create(factory.configToParams(config, { audioResourceAsyncRegistry, audioListenersRegistry })));

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
    create,
    createFromConfig,
    loadAsync: audioLoader.loadAsync,
    loadFromConfigAsync: audioLoader.loadFromConfigAsync,
    ...destroyable
  };
}
