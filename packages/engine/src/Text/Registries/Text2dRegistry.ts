import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TText2dRegistry, TText2dWrapper } from '@/Text/Models';

export function Text2dRegistry(): TText2dRegistry {
  return AbstractEntityRegistry<TText2dWrapper>(RegistryType.Text2d);
}
