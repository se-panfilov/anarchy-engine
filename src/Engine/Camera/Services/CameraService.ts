import type { Subscription } from 'rxjs';

import type { TRegistryPack } from '@/Engine/Abstract';
import type { TCameraConfig, TCameraFactory, TCameraParams, TCameraRegistry, TCameraService, TCameraWrapper } from '@/Engine/Camera/Models';
import { ambientContext } from '@/Engine/Context';
import type { TDestroyable, TWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TScreenSizeValues } from '@/Engine/Screen';
import { isNotDefined } from '@/Engine/Utils';

export function CameraService(factory: TCameraFactory, registry: TCameraRegistry, scene: TSceneWrapper, isUpdateCamerasAspect: boolean = true): TCameraService {
  const withActive: TWithActiveMixinResult<TCameraWrapper> = withActiveEntityServiceMixin<TCameraWrapper>(registry);
  const registrySub$: Subscription = registry.added$.subscribe(({ value }: TRegistryPack<TCameraWrapper>): void => {
    scene.addCamera(value);
    if (value.isActive()) withActive.active$.next(value);
  });
  const factorySub$: Subscription = factory.entityCreated$.subscribe((wrapper: TCameraWrapper): void => registry.add(wrapper));

  let screenSizeSub$: Subscription | undefined = undefined;

  const findActive = withActive.findActive;

  function startUpdatingCamerasAspect(shouldUpdateOnlyActiveCamera: boolean = false): void {
    screenSizeSub$ = ambientContext.screenSizeWatcher.value$.subscribe((params: TScreenSizeValues): void => {
      if (shouldUpdateOnlyActiveCamera) {
        const activeCamera: TCameraWrapper | undefined = findActive();
        if (isNotDefined(activeCamera)) throw new Error('Cannot find an active camera during the aspect update.');
        activeCamera.setAspect(params.width / params.height);
      } else {
        registry.getAll().forEach((camera: TCameraWrapper): void => camera.setAspect(params.width / params.height));
      }
    });
  }

  if (isUpdateCamerasAspect) startUpdatingCamerasAspect(false);

  const screenSizeDestroy$: Subscription = ambientContext.screenSizeWatcher.destroy$.subscribe(() => {
    screenSizeSub$?.unsubscribe();
    screenSizeDestroy$.unsubscribe();
  });

  const create = (params: TCameraParams): TCameraWrapper => factory.create(params);
  const createFromConfig = (cameras: ReadonlyArray<TCameraConfig>): ReadonlyArray<TCameraWrapper> => cameras.map((config: TCameraConfig): TCameraWrapper => create(factory.configToParams(config)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroy$.subscribe((): void => {
    registrySub$.unsubscribe();
    factorySub$.unsubscribe();

    factory.destroy$.next();
    registry.destroy$.next();

    withActive.active$.complete();
    withActive.active$.unsubscribe();

    ambientContext.screenSizeWatcher.destroy$.next();
  });

  return {
    create,
    createFromConfig,
    setActive: withActive.setActive,
    findActive,
    active$: withActive.active$.asObservable(),
    startUpdatingCamerasAspect,
    getFactory: (): TCameraFactory => factory,
    getRegistry: (): TCameraRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
