import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TText2dRegistry, TText2dWrapper } from '@hellpig/anarchy-engine/Text/Models';

export function Text2dRegistry(): TText2dRegistry {
  return AbstractEntityRegistry<TText2dWrapper>(RegistryType.Text2d);
}
