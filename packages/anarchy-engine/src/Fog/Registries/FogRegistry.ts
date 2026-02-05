import { RegistryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@hellpig/anarchy-engine/Abstract/Registries';
import type { TFogRegistry, TFogWrapper } from '@hellpig/anarchy-engine/Fog/Models';

export function FogRegistry(): TFogRegistry {
  return AbstractEntityRegistry<TFogWrapper>(RegistryType.Fog);
}
