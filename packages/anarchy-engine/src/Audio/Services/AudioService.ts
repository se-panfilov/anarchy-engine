import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
import { Listeners } from '@hellpig/anarchy-engine/Audio/Constants';
import { AudioLoader } from '@hellpig/anarchy-engine/Audio/Loader';
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
  TAudioSerializeResourcesDependencies,
  TAudioService,
  TAudioServiceDependencies,
  TAudioServiceWithCreate,
  TAudioServiceWithCreateFromConfig,
  TAudioServiceWithFactory,
  TAudioServiceWithRegistry
} from '@hellpig/anarchy-engine/Audio/Models';
import type { TLoadingManagerWrapper } from '@hellpig/anarchy-engine/LoadingManager';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSerializableEntities, withSerializeAllResources } from '@hellpig/anarchy-engine/Mixins';
import type { TSpaceLoops } from '@hellpig/anarchy-engine/Space';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
import type { Subscription } from 'rxjs';
import { AudioListener } from 'three';

// TODO Audio: Maybe implement "Sound Perception Manager" for NPCs to react to a sound (if they are in a radius)
export function AudioService(
  factory: TAudioFactory,
  registry: TAudioRegistry,
  audioResourceAsyncRegistry: TAudioResourceAsyncRegistry,
  audioListenersRegistry: TAudioListenersRegistry,
  metaInfoRegistry: TAudioMetaInfoRegistry,
  dependencies: TAudioServiceDependencies,
  { audioLoop }: TSpaceLoops,
  loadingManagerWrapper: TLoadingManagerWrapper
): TAudioService {
  const audioLoader: TAudioLoader = AudioLoader(audioResourceAsyncRegistry, metaInfoRegistry, loadingManagerWrapper);
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

  return mergeAll(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withFactory,
    withRegistry,
    withSerializeAllResources<TAudioResourceConfig, TAudioSerializeResourcesDependencies>(audioResourceAsyncRegistry, {
      audioResourceAsyncRegistry,
      audioListenersRegistry,
      metaInfoRegistry
    }),
    withSerializableEntities<TAnyAudioWrapper, TAnyAudioConfig, TAudioConfigToParamsDependencies>(registry, { audioResourceAsyncRegistry, audioListenersRegistry }),
    {
      getResourceRegistry: (): TAudioResourceAsyncRegistry => audioResourceAsyncRegistry,
      getMetaInfoRegistry: (): TAudioMetaInfoRegistry => metaInfoRegistry,
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
