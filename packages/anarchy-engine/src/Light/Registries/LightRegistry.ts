import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TAbstractLightWrapper, TAnyLight, TLightRegistry } from '@Anarchy/Engine/Light/Models';

export function LightRegistry(): TLightRegistry {
  return AbstractEntityRegistry<TAbstractLightWrapper<TAnyLight>>(RegistryType.Light);
}
