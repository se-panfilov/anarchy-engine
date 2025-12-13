import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TDataTexture, TEnvMapAsyncRegistry } from '@/Engine/EnvMap/Models';

export const EnvMapAsyncRegistry = (): TEnvMapAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<TDataTexture>(RegistryType.EnvMap));
