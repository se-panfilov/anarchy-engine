import { AbstractSimpleRegistry, RegistryType } from '@Engine/Abstract';
import type { TEnvMapMetaInfoRegistry, TEnvMapResourceConfig } from '@Engine/EnvMap/Models';

export function EnvMapMetaInfoRegistry(): TEnvMapMetaInfoRegistry {
  return AbstractSimpleRegistry<TEnvMapResourceConfig>(RegistryType.EnvMapMetaInfo);
}
