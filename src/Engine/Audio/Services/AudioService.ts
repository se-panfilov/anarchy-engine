import type { Subscription } from 'rxjs';

import { AudioLoader } from '@/Engine/Audio/Loader';
import type { TAudioConfig, TAudioFactory, TAudioLoader, TAudioParams, TAudioRegistry, TAudioResourceAsyncRegistry, TAudioService, TAudioWrapper } from '@/Engine/Audio/Models';
import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';

// TODO 11.0.0: Load all audio resources in Space (during config build)
// TODO 11.0.0: Fix type TAudioService
// TODO 11.0.0: How to upload a sound and reuse it?
// TODO 11.0.0: Upload async
// TODO 11.0.0: Upload from config
// TODO 11.0.0: Add effects to a sound
// TODO 11.0.0: Add Audio loop (to update 3d sounds, when position changes, but not more often than with tick$)
// TODO 11.0.0: Implement "Sound Perception Manager" for NPCs to react to a sound (if they are in a radius)
// TODO 11.0.0: Optionally implement raycast sound (if a sound is blocked by an object)
export function AudioService(factory: TAudioFactory, registry: TAudioRegistry, resourcesRegistry: TAudioResourceAsyncRegistry): TAudioService {
  const audioLoader: TAudioLoader = AudioLoader(resourcesRegistry);
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAudioWrapper): void => registry.add(wrapper));

  const create = (params: TAudioParams): TAudioWrapper => factory.create(params, { animationsService, model3dRawToAudioConnectionRegistry });
  const createFromConfig = (models3d: ReadonlyArray<TAudioConfig>): ReadonlyArray<TAudioWrapper> =>
    models3d.map(
      (config: TAudioConfig): TAudioWrapper => create(factory.configToParams(config, { animationsResourceAsyncRegistry, materialRegistry, model3dResourceAsyncRegistry: resourcesRegistry }))
    );

  const destroyable: TDestroyable = destroyableMixin();
  const destroySub$: Subscription = destroyable.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    factorySub$.unsubscribe();

    registry.destroy$.next();
    // TODO DESTROY: We need a way to unload models3d, tho
    resourcesRegistry.destroy$.next();
  });

  return {
    getFactory: (): TAudioFactory => factory,
    getRegistry: (): TAudioRegistry => registry,
    getResourceRegistry: (): TAudioResourceAsyncRegistry => resourcesRegistry,
    create,
    createFromConfig,
    loadAsync: audioLoader.loadAsync,
    loadFromConfigAsync: audioLoader.loadFromConfigAsync,
    ...destroyable
  };
}
