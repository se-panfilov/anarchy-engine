import type { Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type {
  TAnyCameraWrapper,
  TCameraFactory,
  TCameraRegistry,
  TCameraService,
  TCameraServiceDependencies,
  TCameraServiceWithCreate,
  TCameraServiceWithCreateFromConfig,
  TCameraServiceWithFactory,
  TCameraServiceWithRegistry,
  TCameraWrapperDependencies,
  TCommonCameraConfig
} from '@/Engine/Camera/Models';
import { isOrthographicCameraWrapper, isPerspectiveCameraWrapper } from '@/Engine/Camera/Utils';
import type { TDisposable, TWithActiveMixinResult } from '@/Engine/Mixins';
import {
  withActiveEntityServiceMixin,
  withCreateFromConfigServiceMixin,
  withCreateServiceMixin,
  withFactoryService,
  withRegistryService,
  withSceneGetterService,
  withSerializeAllEntities
} from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import { isNotDefined } from '@/Engine/Utils';

export function CameraService(factory: TCameraFactory, registry: TCameraRegistry, scene: TSceneWrapper, dependencies: TCameraServiceDependencies): TCameraService {
  const withActive: TWithActiveMixinResult<TAnyCameraWrapper> = withActiveEntityServiceMixin<TAnyCameraWrapper>(registry);
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TAnyCameraWrapper>): void => {
    scene.addCamera(value);
    if (value.isActive()) withActive.active$.next(value);
  });
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TAnyCameraWrapper): void => registry.add(wrapper));
  const disposable: ReadonlyArray<TDisposable> = [registry, factory, registrySub$, factorySub$];
  const abstractService: TAbstractService = AbstractService(disposable);

  // TODO 9.2.0 ACTIVE: Rework ACTIVE mixin to active$ (add hooks to apply ratio). Do the same for all entities with active
  const findActive = withActive.findActive;

  // TODO 9.2.0 ACTIVE: This could be moved in active$ camera and applied in onActive hook
  function startUpdatingCamerasAspect(shouldUpdateOnlyActiveCamera: boolean = false): void {
    dependencies.container.resize$
      .pipe(
        distinctUntilChanged((prev: DOMRect, curr: DOMRect): boolean => prev.width === curr.width && prev.height === curr.height),
        takeUntil(abstractService.destroy$)
      )
      .subscribe((params: DOMRect): void => {
        if (shouldUpdateOnlyActiveCamera) {
          const activeCamera: TAnyCameraWrapper | undefined = findActive();
          if (isNotDefined(activeCamera)) throw new Error('Cannot find an active camera during the aspect update.');
          if (isPerspectiveCameraWrapper(activeCamera)) activeCamera.setAspect(params.width / params.height);
          if (isOrthographicCameraWrapper(activeCamera)) activeCamera.setAspect(params.width, params.height);
        } else {
          registry.forEach((camera: TAnyCameraWrapper): void => {
            if (isPerspectiveCameraWrapper(camera)) camera.setAspect(params.width / params.height);
            if (isOrthographicCameraWrapper(camera)) camera.setAspect(params.width, params.height);
          });
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
    withActive.active$.complete();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(
    abstractService,
    withCreateService,
    withCreateFromConfigService,
    withRegistry,
    withFactory,
    withSceneGetterService(scene),
    withSerializeAllEntities<TCommonCameraConfig, Pick<TCameraWrapperDependencies, 'audioService'>>(registry, { audioService: dependencies.audioService }),
    {
      setActive: withActive.setActive,
      findActive,
      getActive: withActive.getActive,
      active$: withActive.active$,
      startUpdatingCamerasAspect
    }
  );
}
