import type { TAbstractService } from '@Anarchy/Engine/Abstract';
import { AbstractService } from '@Anarchy/Engine/Abstract';
import type {
  TLoadingManagerFactory,
  TLoadingManagerRegistry,
  TLoadingManagerService,
  TLoadingManagerServiceWithCreate,
  TLoadingManagerServiceWithFactory,
  TLoadingManagerServiceWithRegistry,
  TLoadingManagerWrapper
} from '@Anarchy/Engine/Loading/Models';
import type { TDisposable } from '@Anarchy/Engine/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService } from '@Anarchy/Engine/Mixins';
import { mergeAll } from '@Anarchy/Engine/Utils';
import type { Subscription } from 'rxjs';

export function LoadingManagerService(factory: TLoadingManagerFactory, registry: TLoadingManagerRegistry): TLoadingManagerService {
  const factorySub$: Subscription = factory.entityCreated$.subscribe((manager: TLoadingManagerWrapper): void => registry.add(manager));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TLoadingManagerServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withFactory: TLoadingManagerServiceWithFactory = withFactoryService(factory);
  const withRegistry: TLoadingManagerServiceWithRegistry = withRegistryService(registry);

  return mergeAll(abstractService, withCreateService, withFactory, withRegistry);
}
