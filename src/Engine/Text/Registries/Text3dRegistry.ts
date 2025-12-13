import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TText3dRegistry, TText3dWrapper } from '@/Engine/Text/Models';

export function Text3dRegistry(): TText3dRegistry {
  return AbstractEntityRegistry<TText3dWrapper>(RegistryType.Text3d);
}
