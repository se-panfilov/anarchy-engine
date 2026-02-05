import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TAbstractCameraRegistry, TAnyCameraWrapper } from '@hellpig/anarchy-engine/Camera/Models';

export function AbstractCameraRegistry(): TAbstractCameraRegistry {
  return AbstractEntityRegistry<TAnyCameraWrapper>(RegistryType.Camera);
}
