import { AbstractSimpleRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TEnvMapMetaInfoRegistry, TEnvMapResourceConfig } from '@hellpig/anarchy-engine/EnvMap/Models';

export function EnvMapMetaInfoRegistry(): TEnvMapMetaInfoRegistry {
  return AbstractSimpleRegistry<TEnvMapResourceConfig>(RegistryType.EnvMapMetaInfo);
}
