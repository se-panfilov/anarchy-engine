import { AbstractResourceAsyncRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@Anarchy/Engine/EnvMap/Models';

export function EnvMapTextureAsyncRegistry(): TEnvMapTextureAsyncRegistry {
  return AbstractResourceAsyncRegistry<TEnvMapTexture>(RegistryType.EnvMapTexture);
}
