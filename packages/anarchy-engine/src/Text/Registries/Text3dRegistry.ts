import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TText3dRegistry, TText3dWrapper } from '@Anarchy/Engine/Text/Models';

export function Text3dRegistry(): TText3dRegistry {
  return AbstractEntityRegistry<TText3dWrapper>(RegistryType.Text3d);
}
