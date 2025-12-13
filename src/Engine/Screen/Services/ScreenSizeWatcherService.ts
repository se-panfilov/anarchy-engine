import type { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { TAbstractService } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TDisposable } from '@/Engine/Mixins';
import { withCreateServiceMixin, withFactoryService, withRegistryService } from '@/Engine/Mixins';
import type {
  TScreenSizeWatcher,
  TScreenSizeWatcherFactory,
  TScreenSizeWatcherRegistry,
  TScreenSizeWatcherService,
  TScreenSizeWatcherServiceWithCreate,
  TScreenSizeWatcherServiceWithFactory,
  TScreenSizeWatcherServiceWithRegistry
} from '@/Engine/Screen/Models';

export function ScreenSizeWatcherService(factory: TScreenSizeWatcherFactory, registry: TScreenSizeWatcherRegistry): TScreenSizeWatcherService {
  const default$: BehaviorSubject<TScreenSizeWatcher | undefined> = new BehaviorSubject<TScreenSizeWatcher | undefined>(undefined);
  const factorySub$: Subscription = factory.entityCreated$.subscribe((watcher: TScreenSizeWatcher): void => {
    if (registry.isEmpty()) default$.next(watcher);
    registry.add(watcher);
  });
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  const withCreateService: TScreenSizeWatcherServiceWithCreate = withCreateServiceMixin(factory, undefined);
  const withFactory: TScreenSizeWatcherServiceWithFactory = withFactoryService(factory);
  const withRegistry: TScreenSizeWatcherServiceWithRegistry = withRegistryService(registry);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    default$.unsubscribe();
    default$.complete();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withFactory, withRegistry, { default$ });
}
