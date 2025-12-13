import type { TAbstractSimpleAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';
import type { TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';

export type TEnvMapAsyncRegistry = TProtectedRegistry<TAbstractSimpleAsyncRegistry<TEnvMapWrapperAsync>>;
