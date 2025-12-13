import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TEnvMapMetaInfoRegistry, TEnvMapResourceConfig } from '@/Engine/EnvMap/Models';

export const EnvMapMetaInfoRegistry = (): TEnvMapMetaInfoRegistry => AbstractSimpleRegistry<TEnvMapResourceConfig>(RegistryType.EnvMapMetaInfo);
