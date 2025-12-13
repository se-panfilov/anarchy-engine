import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TEnvMapRegistry, TEnvMapWrapper } from '@/Engine/EnvMap/Models';

export const EnvMapRegistry = (): TEnvMapRegistry => AbstractEntityRegistry<TEnvMapWrapper>(RegistryType.EnvMap);
