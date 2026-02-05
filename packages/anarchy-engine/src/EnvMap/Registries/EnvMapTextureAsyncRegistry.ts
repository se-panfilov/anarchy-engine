import { AbstractResourceAsyncRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@hellpig/anarchy-engine/EnvMap/Models';

export function EnvMapTextureAsyncRegistry(): TEnvMapTextureAsyncRegistry {
  return AbstractResourceAsyncRegistry<TEnvMapTexture>(RegistryType.EnvMapTexture);
}
