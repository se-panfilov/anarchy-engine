import { RegistryType } from '@/Engine/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Engine/Abstract/Registries';
import type { TFogRegistry, TFogWrapper } from '@/Engine/Fog/Models';

export function FogRegistry(): TFogRegistry {
  return AbstractEntityRegistry<TFogWrapper>(RegistryType.Fog);
}
