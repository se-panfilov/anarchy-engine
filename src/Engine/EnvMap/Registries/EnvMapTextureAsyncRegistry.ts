import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TEnvMapTexture, TEnvMapTextureAsyncRegistry } from '@/Engine/EnvMap/Models';

export const EnvMapTextureAsyncRegistry = (): TEnvMapTextureAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<TEnvMapTexture>(RegistryType.EnvMapTexture));
