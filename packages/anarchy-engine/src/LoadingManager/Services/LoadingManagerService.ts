import type { TAbstractService } from '@hellpig/anarchy-engine/Abstract';
import { AbstractService } from '@hellpig/anarchy-engine/Abstract';
import { DEFAULT_SPACE_LOADING_MANAGER_NAME } from '@hellpig/anarchy-engine/LoadingManager/Constants';
import type {
  TLoadingManagerFactory,
  TLoadingManagerRegistry,
  TLoadingManagerService,
  TLoadingManagerServiceWithCreate,
  TLoadingManagerServiceWithFactory,
  TLoadingManagerServiceWithRegistry,
  TLoadingManagerWrapper
} from '@hellpig/anarchy-engine/LoadingManager/Models';
import type { TDisposable } from '@hellpig/anarchy-engine/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService } from '@hellpig/anarchy-engine/Mixins';
import { mergeAll } from '@hellpig/anarchy-engine/Utils';
import type { Subscription } from 'rxjs';

export function LoadingManagerService(factory: TLoadingManagerFactory, registry: TLoadingManagerRegistry): TLoadingManagerService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((manager: TLoadingManagerWrapper): void => registry.add(manager));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TLoadingManagerServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withFactory: TLoadingManagerServiceWithFactory = withFactoryService(factory);
  const withRegistry: TLoadingManagerServiceWithRegistry = withRegistryService(registry);

  function getDefault(): TLoadingManagerWrapper {
    return registry.getByName(DEFAULT_SPACE_LOADING_MANAGER_NAME);
  }

  return mergeAll(abstractService, withCreateService, withFactory, withRegistry, { getDefault });
}
