import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TAbstractCameraRegistry, TAnyCameraWrapper } from '@Anarchy/Engine/Camera/Models';

export function AbstractCameraRegistry(): TAbstractCameraRegistry {
  return AbstractEntityRegistry<TAnyCameraWrapper>(RegistryType.Camera);
}
