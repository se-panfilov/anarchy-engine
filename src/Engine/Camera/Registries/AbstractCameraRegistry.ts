import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TAbstractCameraRegistry, TAnyCameraWrapper } from '@/Engine/Camera/Models';

export function AbstractCameraRegistry(): TAbstractCameraRegistry {
  return AbstractEntityRegistry<TAnyCameraWrapper>(RegistryType.Camera);
}
