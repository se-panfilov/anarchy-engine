import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { IAbstractCameraRegistry, ICameraWrapper } from '@/Engine/Camera/Models';

export function AbstractCameraRegistry(): IAbstractCameraRegistry {
  const abstractRegistry = AbstractEntityRegistry<ICameraWrapper>(RegistryType.Camera);

  const getActiveCamera = (): ICameraWrapper | undefined => abstractRegistry.find((camera: ICameraWrapper) => camera.isActive());

  return { ...abstractRegistry, getActiveCamera };
}
