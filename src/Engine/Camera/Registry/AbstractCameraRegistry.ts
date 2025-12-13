import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { IAbstractCameraRegistry, ICameraWrapper } from '@/Engine/Camera/Models';

export function AbstractCameraRegistry(): IAbstractCameraRegistry {
  return AbstractEntityRegistry<ICameraWrapper>(RegistryType.Camera);
}
