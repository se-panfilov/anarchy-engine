import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TAbstractLightWrapper, TAnyLight, TLightRegistry } from '@/Light/Models';

export function LightRegistry(): TLightRegistry {
  return AbstractEntityRegistry<TAbstractLightWrapper<TAnyLight>>(RegistryType.Light);
}
