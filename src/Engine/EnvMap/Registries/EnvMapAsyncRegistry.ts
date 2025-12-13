import { AbstractAsyncSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TDataTexture, TEnvMapAsyncRegistry } from '@/Engine/EnvMap/Models';

export const EnvMapAsyncRegistry = (): TEnvMapAsyncRegistry => RegistryFacade(AbstractAsyncSimpleRegistry<TDataTexture>(RegistryType.EnvMap));
