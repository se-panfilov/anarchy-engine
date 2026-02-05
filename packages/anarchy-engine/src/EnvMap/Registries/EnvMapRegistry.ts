import { AbstractEntityRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TEnvMapRegistry, TEnvMapWrapper } from '@hellpig/anarchy-engine/EnvMap/Models';

export function EnvMapRegistry(): TEnvMapRegistry {
  return AbstractEntityRegistry<TEnvMapWrapper>(RegistryType.EnvMap);
}
