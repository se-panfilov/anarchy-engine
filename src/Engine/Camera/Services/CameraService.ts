import type { Subscription } from 'rxjs';

import type { TCameraConfig, TCameraFactory, TCameraParams, TCameraRegistry, TCameraService, TCameraWrapper } from '@/Engine/Camera/Models';
import { ambientContext } from '@/Engine/Context';
import type { IWithActiveMixinResult, TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { TScreenSizeValues } from '@/Engine/Screen';
import { isNotDefined } from '@/Engine/Utils';

export function CameraService(factory: TCameraFactory, registry: TCameraRegistry, scene: TSceneWrapper, isUpdateCamerasAspect: boolean = true): TCameraService {
  const withActive: IWithActiveMixinResult<TCameraWrapper> = withActiveEntityServiceMixin<TCameraWrapper>(registry);
  registry.added$.subscribe((wrapper: TCameraWrapper): void => {
    scene.addCamera(wrapper);
    if (wrapper.isActive()) withActive.active$.next(wrapper);
  });
  factory.entityCreated$.subscribe((wrapper: TCameraWrapper): void => registry.add(wrapper));

  let screenSize$: Subscription | undefined = undefined;

  const findActive = withActive.findActive;

  function startUpdatingCamerasAspect(shouldUpdateOnlyActiveCamera: boolean = false): void {
    screenSize$ = ambientContext.screenSizeWatcher.value$.subscribe((params: TScreenSizeValues): void => {
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

  const screenSizeDestroy$: Subscription = ambientContext.screenSizeWatcher.destroyed$.subscribe(() => {
    screenSize$?.unsubscribe();
    screenSizeDestroy$.unsubscribe();
  });

  const create = (params: TCameraParams): TCameraWrapper => factory.create(params);
  const createFromConfig = (cameras: ReadonlyArray<TCameraConfig>): void => cameras.forEach((config: TCameraConfig): TCameraWrapper => factory.create(factory.configToParams(config)));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
    withActive.active$.complete();
    screenSize$?.unsubscribe();
    screenSizeDestroy$.unsubscribe();
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
