import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TAbstractCameraRegistry, TAnyCameraWrapper } from '@/Camera/Models';

export function AbstractCameraRegistry(): TAbstractCameraRegistry {
  return AbstractEntityRegistry<TAnyCameraWrapper>(RegistryType.Camera);
}
