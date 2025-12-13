import { AbstractEntityRegistry, RegistryType } from '@Engine/Abstract';
import type { TEnvMapRegistry, TEnvMapWrapper } from '@Engine/EnvMap/Models';

export function EnvMapRegistry(): TEnvMapRegistry {
  return AbstractEntityRegistry<TEnvMapWrapper>(RegistryType.EnvMap);
}
