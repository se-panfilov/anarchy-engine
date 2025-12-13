import { AbstractSimpleRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TEnvMapMetaInfoRegistry, TEnvMapResourceConfig } from '@Anarchy/Engine/EnvMap/Models';

export function EnvMapMetaInfoRegistry(): TEnvMapMetaInfoRegistry {
  return AbstractSimpleRegistry<TEnvMapResourceConfig>(RegistryType.EnvMapMetaInfo);
}
