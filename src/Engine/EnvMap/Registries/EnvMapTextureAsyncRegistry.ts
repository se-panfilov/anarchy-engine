import { AbstractSimpleAsyncRegistry, RegistryType } from '@/Engine/Abstract';
import type { TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@/Engine/EnvMap/Models';

export const EnvMapTextureAsyncRegistry = (): TEnvMapTextureAsyncRegistry => AbstractSimpleAsyncRegistry<TEnvMapTexture>(RegistryType.EnvMapTexture);
