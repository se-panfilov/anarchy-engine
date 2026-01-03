import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import { Listeners } from '@Anarchy/Engine/Audio/Constants';
import { AudioLoader } from '@Anarchy/Engine/Audio/Loader';
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
} from '@Anarchy/Engine/Audio/Models';
import type { TLoadingManagerWrapper } from '@Anarchy/Engine/LoadingManager';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSerializableEntities, withSerializeAllResources } from '@Anarchy/Engine/Mixins';
import type { TSpaceLoops } from '@Anarchy/Engine/Space';
import { mergeAll } from '@Anarchy/Engine/Utils';
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
