import type { Subscription } from 'rxjs';
import { AudioListener } from 'three';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import { Listeners } from '@/Engine/Audio/Constants';
import { AudioLoader } from '@/Engine/Audio/Loader';
import type {
  TAnyAudioConfig,
  TAnyAudioWrapper,
  TAudioConfigToParamsDependencies,
  TAudioFactory,
  TAudioListenersRegistry,
  TAudioLoader,
  TAudioMetaInfoRegistry,
  TAudioRegistry,
  TAudioResourceAsyncRegistry,
  TAudioResourceConfig,
  TAudioService,
  TAudioServiceDependencies,
  TAudioServiceWithCreate,
  TAudioServiceWithCreateFromConfig,
  TAudioServiceWithFactory,
  TAudioServiceWithRegistry
} from '@/Engine/Audio/Models';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSerializeAllEntities, withSerializeAllResources } from '@/Engine/Mixins';
import type { TSpaceLoops } from '@/Engine/Space';

// TODO Audio: Maybe implement "Sound Perception Manager" for NPCs to react to a sound (if they are in a radius)
export function AudioService(
  factory: TAudioFactory,
  registry: TAudioRegistry,
  audioResourceAsyncRegistry: TAudioResourceAsyncRegistry,
  audioListenersRegistry: TAudioListenersRegistry,
  audioMetaInfoRegistry: TAudioMetaInfoRegistry,
  dependencies: TAudioServiceDependencies,
  { audioLoop }: TSpaceLoops
): TAudioService {
  const audioLoader: TAudioLoader = AudioLoader(audioResourceAsyncRegistry, audioMetaInfoRegistry);
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAnyAudioWrapper): void => registry.add(wrapper));

  const disposable: ReadonlyArray<TDisposable> = [registry, factory, audioResourceAsyncRegistry, audioListenersRegistry, factorySub$, audioLoader];
  const abstractService: TAbstractService = AbstractService(disposable);

  // Currently we have only one listener, but more could be added in the future
  audioListenersRegistry.add(Listeners.Main, new AudioListener());

  const withCreateService: TAudioServiceWithCreate = withCreateServiceMixin(factory, { audioLoop, ...dependencies });
  const withCreateFromConfigService: TAudioServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, {
    audioResourceAsyncRegistry,
    audioListenersRegistry
  });
  const withFactory: TAudioServiceWithFactory = withFactoryService(factory);
  const withRegistry: TAudioServiceWithRegistry = withRegistryService(registry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    withSerializeAllResources<TAudioResourceConfig, TAudioConfigToParamsDependencies>(audioResourceAsyncRegistry, { audioResourceAsyncRegistry, audioListenersRegistry }),
    withSerializeAllEntities<TAnyAudioConfig, undefined>(registry),
    {
      getResourceRegistry: (): TAudioResourceAsyncRegistry => audioResourceAsyncRegistry,
      getMetaInfoRegistry: (): TAudioMetaInfoRegistry => audioMetaInfoRegistry,
      getListenersRegistry: (): TAudioListenersRegistry => audioListenersRegistry,
      getMainListener: (): AudioListener | undefined => audioListenersRegistry.findByKey(Listeners.Main),
      loadAsync: audioLoader.loadAsync,
      loadFromConfigAsync: audioLoader.loadFromConfigAsync,
      serializeAllListeners: (): ReadonlyArray<AudioListener> => {
        return audioListenersRegistry.serialize() as ReadonlyArray<AudioListener>;
      }
    }
  );
}
