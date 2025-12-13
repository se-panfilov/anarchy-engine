import { AbstractSimpleRegistry, RegistryType } from '@/Abstract';
import type { TEnvMapMetaInfoRegistry, TEnvMapResourceConfig } from '@/EnvMap/Models';

export function EnvMapMetaInfoRegistry(): TEnvMapMetaInfoRegistry {
  return AbstractSimpleRegistry<TEnvMapResourceConfig>(RegistryType.EnvMapMetaInfo);
}
