import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { IAbstractCameraRegistry, ICameraWrapper } from '@/Engine/Camera/Models';

export function AbstractCameraRegistry(): IAbstractCameraRegistry {
  return AbstractEntityRegistry<ICameraWrapper>(RegistryType.Camera);
}
