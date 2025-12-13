import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TText2dRegistry, TText2dWrapper } from '@/Engine/Text/Models';

export function Text2dRegistry(): TText2dRegistry {
  return AbstractEntityRegistry<TText2dWrapper>(RegistryType.Text2d);
}
