import { RegistryType } from '@/Abstract/Constants';
import { AbstractEntityRegistry } from '@/Abstract/Registries';
import type { TFogRegistry, TFogWrapper } from '@/Fog/Models';

export function FogRegistry(): TFogRegistry {
  return AbstractEntityRegistry<TFogWrapper>(RegistryType.Fog);
}
