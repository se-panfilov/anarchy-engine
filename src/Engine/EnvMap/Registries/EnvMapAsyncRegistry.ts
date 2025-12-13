import { AbstractSimpleAsyncRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TEnvMapAsyncRegistry, TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';

export const EnvMapAsyncRegistry = (): TEnvMapAsyncRegistry => RegistryFacade(AbstractSimpleAsyncRegistry<TEnvMapWrapperAsync>(RegistryType.EnvMap));
