import type { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs';

import type { TAbstractService, TRegistryPack } from '@/Engine/Abstract';
import { AbstractService } from '@/Engine/Abstract';
import type { TCameraConfig, TCameraFactory, TCameraParams, TCameraRegistry, TCameraService, TCameraServiceDependencies, TCameraWrapper } from '@/Engine/Camera/Models';
import { ambientContext } from '@/Engine/Context';
import type { TWithActiveMixinResult } from '@/Engine/Mixins';
import { withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TScreenSizeValues } from '@/Engine/Screen';
import { isNotDefined } from '@/Engine/Utils';

export function CameraService(
  factory: TCameraFactory,
  registry: TCameraRegistry,
  scene: TSceneWrapper,
  dependencies: TCameraServiceDependencies,
  shouldUpdateCamerasAspect: boolean = true
): TCameraService {
  const abstractService: TAbstractService = AbstractService();
  const withActive: TWithActiveMixinResult<TCameraWrapper> = withActiveEntityServiceMixin<TCameraWrapper>(registry);
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TCameraWrapper>): void => {
    scene.addCamera(value);
    if (value.isActive()) withActive.active$.next(value);
  });
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TCameraWrapper): void => registry.add(wrapper));

  let screenSizeSub$: Subscription | undefined = undefined;

  // TODO 9.2.0 ACTIVE: Rework ACTIVE mixin to active$ (add hooks to apply ratio). Do the same for all entities with active
  const findActive = withActive.findActive;

  // TODO 9.2.0 ACTIVE: This could be moved in active$ camera and applied in onActive hook
  function startUpdatingCamerasAspect(shouldUpdateOnlyActiveCamera: boolean = false): void {
    screenSizeSub$ = ambientContext.screenSizeWatcher.value$
      .pipe(distinctUntilChanged((prev: TScreenSizeValues, curr: TScreenSizeValues): boolean => prev.width === curr.width && prev.height === curr.height))
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

  if (shouldUpdateCamerasAspect) startUpdatingCamerasAspect(false);

  const screenSizeDestroy$: Subscription = ambientContext.screenSizeWatcher.destroy$.subscribe(() => {
    screenSizeSub$?.unsubscribe();
    screenSizeDestroy$.unsubscribe();
  });

  const create = (params: TCameraParams): TCameraWrapper => factory.create(params, dependencies);
  const createFromConfig = (cameras: ReadonlyArray<TCameraConfig>): ReadonlyArray<TCameraWrapper> =>
    cameras.map((config: TCameraConfig): TCameraWrapper => create(factory.configToParams(config, dependencies)));

  const destroySub$: Subscription = abstractService.destroy$.subscribe((): void => {
    destroySub$.unsubscribe();

    registrySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();

    withActive.active$.complete();
    withActive.active$.unsubscribe();

    ambientContext.screenSizeWatcher.destroy$.next();
  });

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractService, {
    create,
    createFromConfig,
    setActive: withActive.setActive,
    findActive,
    active$: withActive.active$,
    startUpdatingCamerasAspect,
    getFactory: (): TCameraFactory => factory,
    getRegistry: (): TCameraRegistry => registry,
    getScene: (): TSceneWrapper => scene
  });
}
