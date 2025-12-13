import type { TAbstractAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';
import type { TEnvMapWrapperAsync } from '@/Engine/EnvMap/Models';

export type TEnvMapAsyncRegistry = TProtectedRegistry<TAbstractAsyncRegistry<TEnvMapWrapperAsync>>;
