import { AbstractEntityRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TEnvMapRegistry, TEnvMapWrapper } from '@Anarchy/Engine/EnvMap/Models';

export function EnvMapRegistry(): TEnvMapRegistry {
  return AbstractEntityRegistry<TEnvMapWrapper>(RegistryType.EnvMap);
}
