import type { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, EMPTY, switchMap } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type {
  TCameraFactory,
  TCameraRegistry,
  TCameraService,
  TCameraServiceDependencies,
  TCameraServiceWithCreate,
  TCameraServiceWithCreateFromConfig,
  TCameraServiceWithFactory,
  TCameraServiceWithRegistry,
  TCameraWrapper
} from '@/Engine/Camera/Models';
import type { TDisposable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { withActiveEntityServiceMixin, withCreateFromConfigServiceMixin, withCreateServiceMixin, withFactoryService, withRegistryService, withSceneGetterService } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TScreenSizeValues, TScreenSizeWatcher } from '@/Engine/Screen';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function CameraService(factory: TCameraFactory, registry: TCameraRegistry, scene: TSceneWrapper, dependencies: TCameraServiceDependencies): TCameraService {
  const withActive: TWithActiveMixinResult<TCameraWrapper> = withActiveEntityServiceMixin<TCameraWrapper>(registry);
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TCameraWrapper>): void => {
    scene.addCamera(value);
    if (value.isActive()) withActive.active$.next(value);
  });
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TCameraWrapper): void => registry.add(wrapper));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  let screenSizeSub$: Subscription | undefined = undefined;

  // TODO 9.2.0 ACTIVE: Rework ACTIVE mixin to active$ (add hooks to apply ratio). Do the same for all entities with active
  const findActive = withActive.findActive;

  // TODO 9.2.0 ACTIVE: This could be moved in active$ camera and applied in onActive hook
  function startUpdatingCamerasAspect(shouldUpdateOnlyActiveCamera: boolean = false): void {
    screenSizeSub$ = dependencies.screenService.watchers.default$
      .pipe(
        switchMap((screenSizeWatcher: TScreenSizeWatcher | undefined): Observable<TScreenSizeValues> => (isDefined(screenSizeWatcher) ? screenSizeWatcher.value$ : EMPTY)),
        distinctUntilChanged((prev: TScreenSizeValues, curr: TScreenSizeValues): boolean => prev.width === curr.width && prev.height === curr.height)
      )
      .subscribe((params: TScreenSizeValues): void => {
        if (shouldUpdateOnlyActiveCamera) {
          const activeCamera: TCameraWrapper | undefined = findActive();
          if (isNotDefined(activeCamera)) throw new Error('Cannot find an active camera during the aspect update.');
          activeCamera.setAspect(params.width / params.height);
        } else {
          registry.forEach((camera: TCameraWrapper): void => camera.setAspect(params.width / params.height));
        }
      });
  }

  startUpdatingCamerasAspect(false);

  const withCreateService: TCameraServiceWithCreate = withCreateServiceMixin(factory, dependencies);
  const withCreateFromConfigService: TCameraServiceWithCreateFromConfig = withCreateFromConfigServiceMixin(withCreateService.create, factory.configToParams, dependencies);
  const withFactory: TCameraServiceWithFactory = withFactoryService(factory);
  const withRegistry: TCameraServiceWithRegistry = withRegistryService(registry);

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();
    screenSizeSub$?.unsubscribe();
    screenSizeSub$ = null as any;

    withActive.active$.complete();
    withActive.active$.unsubscribe();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, withCreateService, withCreateFromConfigService, withRegistry, withFactory, withSceneGetterService(scene), {
    setActive: withActive.setActive,
    findActive,
    active$: withActive.active$,
    startUpdatingCamerasAspect
  });
}
