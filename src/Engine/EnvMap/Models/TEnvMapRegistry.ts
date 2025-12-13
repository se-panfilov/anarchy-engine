import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';
import type { TEnvMapWrapper } from '@/Engine/EnvMap/Models';

export type TEnvMapRegistry = TProtectedRegistry<TAbstractEntityRegistry<TEnvMapWrapper>>;
