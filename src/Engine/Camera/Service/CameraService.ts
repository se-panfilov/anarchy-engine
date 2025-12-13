import type { ICameraConfig, ICameraFactory, ICameraParams, ICameraRegistry, ICameraService, ICameraWrapper } from '@/Engine/Camera/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';
import { findActiveWrappedEntity, setActiveWrappedEntity } from '@/Engine/Utils';
import { CommonTag } from '@/Engine/Abstract';

export function CameraService(factory: ICameraFactory, registry: ICameraRegistry, scene: ISceneWrapper): ICameraService {
  registry.added$.subscribe((wrapper: ICameraWrapper): void => scene.addCamera(wrapper));
  factory.entityCreated$.subscribe((wrapper: ICameraWrapper): void => registry.add(wrapper));

  const create = (params: ICameraParams): ICameraWrapper => factory.create(params);
  const createFromConfig = (cameras: ReadonlyArray<ICameraConfig>): void =>
    cameras.forEach((config: ICameraConfig): ICameraWrapper => factory.create(factory.configToParams({ ...config, tags: [...config.tags, CommonTag.FromConfig] })));

  const setActiveCamera = (cameraId: string): void => setActiveWrappedEntity(registry, cameraId);
  const findActiveCamera = (): ICameraWrapper | undefined => findActiveWrappedEntity(registry);

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    create,
    createFromConfig,
    setActiveCamera,
    findActiveCamera,
    ...destroyable
  };
}
