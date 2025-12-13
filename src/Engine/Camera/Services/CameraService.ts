import type { Subscription } from 'rxjs';

import type { ICameraConfig, ICameraFactory, ICameraParams, ICameraRegistry, ICameraService, ICameraWrapper } from '@/Engine/Camera/Models';
import { ambientContext } from '@/Engine/Context';
import type { TDestroyable, IWithActiveMixinResult } from '@/Engine/Mixins';
import { destroyableMixin, withActiveEntityServiceMixin } from '@/Engine/Mixins';
import type { TSceneWrapper } from '@/Engine/Scene';
import type { IScreenSizeValues } from '@/Engine/Screen';
import { isNotDefined } from '@/Engine/Utils';

export function CameraService(factory: ICameraFactory, registry: ICameraRegistry, scene: TSceneWrapper, isUpdateCamerasAspect: boolean = true): ICameraService {
  const withActive: IWithActiveMixinResult<ICameraWrapper> = withActiveEntityServiceMixin<ICameraWrapper>(registry);
  registry.added$.subscribe((wrapper: ICameraWrapper): void => {
    scene.addCamera(wrapper);
    if (wrapper.isActive()) withActive.active$.next(wrapper);
  });
  factory.entityCreated$.subscribe((wrapper: ICameraWrapper): void => registry.add(wrapper));

  let screenSize$: Subscription | undefined = undefined;

  const findActive = withActive.findActive;

  function startUpdatingCamerasAspect(shouldUpdateOnlyActiveCamera: boolean = false): void {
    screenSize$ = ambientContext.screenSizeWatcher.value$.subscribe((params: IScreenSizeValues): void => {
      if (shouldUpdateOnlyActiveCamera) {
        const activeCamera: ICameraWrapper | undefined = findActive();
        if (isNotDefined(activeCamera)) throw new Error('Cannot find an active camera during the aspect update.');
        activeCamera.setAspect(params.width / params.height);
      } else {
        registry.getAll().forEach((camera: ICameraWrapper): void => camera.setAspect(params.width / params.height));
      }
    });
  }

  if (isUpdateCamerasAspect) startUpdatingCamerasAspect(false);

  const screenSizeDestroy$: Subscription = ambientContext.screenSizeWatcher.destroyed$.subscribe(() => {
    screenSize$?.unsubscribe();
    screenSizeDestroy$.unsubscribe();
  });

  const create = (params: ICameraParams): ICameraWrapper => factory.create(params);
  const createFromConfig = (cameras: ReadonlyArray<ICameraConfig>): void => cameras.forEach((config: ICameraConfig): ICameraWrapper => factory.create(factory.configToParams(config)));

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
    getFactory: (): ICameraFactory => factory,
    getRegistry: (): ICameraRegistry => registry,
    getScene: (): TSceneWrapper => scene,
    ...destroyable
  };
}
