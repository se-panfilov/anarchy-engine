import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TText3dRegistry, TText3dWrapper } from '@hellpig/anarchy-engine/Text/Models';

export function Text3dRegistry(): TText3dRegistry {
  return AbstractEntityRegistry<TText3dWrapper>(RegistryType.Text3d);
}
