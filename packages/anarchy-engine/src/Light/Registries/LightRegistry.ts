import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TAbstractLightWrapper, TAnyLight, TLightRegistry } from '@hellpig/anarchy-engine/Light/Models';

export function LightRegistry(): TLightRegistry {
  return AbstractEntityRegistry<TAbstractLightWrapper<TAnyLight>>(RegistryType.Light);
}
