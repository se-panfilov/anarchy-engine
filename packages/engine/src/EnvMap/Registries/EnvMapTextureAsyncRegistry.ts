import { AbstractResourceAsyncRegistry, RegistryType } from '@/Abstract';
import type { TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@/EnvMap/Models';

export function EnvMapTextureAsyncRegistry(): TEnvMapTextureAsyncRegistry {
  return AbstractResourceAsyncRegistry<TEnvMapTexture>(RegistryType.EnvMapTexture);
}
