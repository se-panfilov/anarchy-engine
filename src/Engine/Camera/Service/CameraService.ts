import type { Subscription } from 'rxjs';

import { CommonTag } from '@/Engine/Abstract';
import type { ICameraConfig, ICameraFactory, ICameraParams, ICameraRegistry, ICameraService, ICameraWrapper } from '@/Engine/Camera/Models';
import { ambientContext } from '@/Engine/Context';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';
import type { IScreenSizeValues } from '@/Engine/Screen';
import { findActiveWrappedEntity, setActiveWrappedEntity } from '@/Engine/Utils';

export function CameraService(factory: ICameraFactory, registry: ICameraRegistry, scene: ISceneWrapper, isUpdateCamerasAspect: boolean = true): ICameraService {
  registry.added$.subscribe((wrapper: ICameraWrapper): void => scene.addCamera(wrapper));
  factory.entityCreated$.subscribe((wrapper: ICameraWrapper): void => registry.add(wrapper));

  let screenSize$: Subscription | undefined = undefined;

  function startUpdatingCamerasAspect(isOnlyActive: boolean = false): void {
    const cameras: ReadonlyArray<ICameraWrapper> = registry.getAll();
    screenSize$ = ambientContext.screenSizeWatcher.value$.subscribe((params: IScreenSizeValues): void => {
      cameras.forEach((camera: ICameraWrapper): void => {
        if ((isOnlyActive && camera.isActive) || !isOnlyActive) camera.setAspect(params.width / params.height);
      });
    });
  }

  if (isUpdateCamerasAspect) startUpdatingCamerasAspect(false);

  const screenSizeDestroy$: Subscription = ambientContext.screenSizeWatcher.destroyed$.subscribe(() => {
    screenSize$?.unsubscribe();
    screenSizeDestroy$.unsubscribe();
  });

  const create = (params: ICameraParams): ICameraWrapper => factory.create(params);
  const createFromConfig = (cameras: ReadonlyArray<ICameraConfig>): void =>
    cameras.forEach((config: ICameraConfig): ICameraWrapper => factory.create(factory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

  const setActiveCamera = (cameraId: string): void => setActiveWrappedEntity(registry, cameraId);
  const findActiveCamera = (): ICameraWrapper | undefined => findActiveWrappedEntity(registry);

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
    screenSize$?.unsubscribe();
    screenSizeDestroy$.unsubscribe();
  });

  return {
    create,
    createFromConfig,
    setActiveCamera,
    findActiveCamera,
    startUpdatingCamerasAspect,
    ...destroyable
  };
}
