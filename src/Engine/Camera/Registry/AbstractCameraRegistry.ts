import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registry';
import type { IAbstractCameraRegistry, ICameraWrapper } from '@/Engine/Camera/Models';

export function AbstractCameraRegistry(): IAbstractCameraRegistry {
  return AbstractEntityRegistry<ICameraWrapper>(RegistryType.Camera);
}
