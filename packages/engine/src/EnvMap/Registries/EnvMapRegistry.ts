import { AbstractEntityRegistry, RegistryType } from '@/Abstract';
import type { TEnvMapRegistry, TEnvMapWrapper } from '@/EnvMap/Models';

export function EnvMapRegistry(): TEnvMapRegistry {
  return AbstractEntityRegistry<TEnvMapWrapper>(RegistryType.EnvMap);
}
