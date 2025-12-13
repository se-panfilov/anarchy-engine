import type { TAbstractAsyncSimpleRegistry, TProtectedRegistry } from '@/Engine/Abstract';
import type { TDataTexture } from '@/Engine/EnvMap/Models';

export type TEnvMapAsyncRegistry = TProtectedRegistry<TAbstractAsyncSimpleRegistry<TDataTexture>>;
