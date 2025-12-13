import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TText3dRegistry, TText3dWrapper } from '@/Text/Models';

export function Text3dRegistry(): TText3dRegistry {
  return AbstractEntityRegistry<TText3dWrapper>(RegistryType.Text3d);
}
