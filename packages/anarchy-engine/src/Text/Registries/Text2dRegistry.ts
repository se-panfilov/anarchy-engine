import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TText2dRegistry, TText2dWrapper } from '@Anarchy/Engine/Text/Models';

export function Text2dRegistry(): TText2dRegistry {
  return AbstractEntityRegistry<TText2dWrapper>(RegistryType.Text2d);
}
