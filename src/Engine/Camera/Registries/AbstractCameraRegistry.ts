import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TAbstractCameraRegistry, TCameraWrapper } from '@/Engine/Camera/Models';

export function AbstractCameraRegistry(): TAbstractCameraRegistry {
  return AbstractEntityRegistry<TCameraWrapper>(RegistryType.Camera);
}
