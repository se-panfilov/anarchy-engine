import { AbstractAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TEnvMapAsyncRegistry, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';

export const EnvMapAsyncRegistry = (): TEnvMapAsyncRegistry => RegistryFacade(AbstractAsyncRegistry<TEnvMapWrapperAsync>(RegistryType.EnvMap));
