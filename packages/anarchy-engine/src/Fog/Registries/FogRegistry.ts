import { RegistryType } from '@Anarchy/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@Anarchy/Engine/Abstract/Registries';
import type { TFogRegistry, TFogWrapper } from '@Anarchy/Engine/Fog/Models';

export function FogRegistry(): TFogRegistry {
  return AbstractEntityRegistry<TFogWrapper>(RegistryType.Fog);
}
