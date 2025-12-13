import type { ICameraFactory, ICameraRegistry, ICameraService, ICameraWrapper } from '@/Engine/Camera/Models';
import type { IDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import type { ISceneWrapper } from '@/Engine/Scene';

export function CameraService(factory: ICameraFactory, registry: ICameraRegistry, scene: ISceneWrapper): ICameraService {
  registry.added$.subscribe((wrapper: ICameraWrapper): void => scene.addCamera(wrapper));
  factory.entityCreated$.subscribe((wrapper: ICameraWrapper): void => registry.add(wrapper));

  function setActiveCamera(cameraId: string, cameraRegistry: ICameraRegistry): void {
    cameraRegistry.forEach((camera: ICameraWrapper) => camera.setActive(camera.id === cameraId));
  }

  function getActiveCamera(cameraRegistry: ICameraRegistry): ICameraWrapper | undefined {
    return cameraRegistry.find((camera: ICameraWrapper) => camera.isActive());
  }

  const destroyable: IDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => {
    factory.destroy();
    registry.destroy();
  });

  return {
    setActiveCamera,
    getActiveCamera,
    ...destroyable
  };
}
