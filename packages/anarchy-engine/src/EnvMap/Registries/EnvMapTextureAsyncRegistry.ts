import { AbstractResourceAsyncRegistry, RegistryType } from '@Engine/Abstract';
import type { TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@Engine/EnvMap/Models';

export function EnvMapTextureAsyncRegistry(): TEnvMapTextureAsyncRegistry {
  return AbstractResourceAsyncRegistry<TEnvMapTexture>(RegistryType.EnvMapTexture);
}
