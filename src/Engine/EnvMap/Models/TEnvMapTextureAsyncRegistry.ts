import type { TAbstractSimpleAsyncRegistry, TProtectedRegistry } from '@/Engine/Abstract';
import type { TEnvMapTexture } from '@/Engine/EnvMap/Models';

export type TEnvMapTextureAsyncRegistry = TProtectedRegistry<TAbstractSimpleAsyncRegistry<TEnvMapTexture>>;
