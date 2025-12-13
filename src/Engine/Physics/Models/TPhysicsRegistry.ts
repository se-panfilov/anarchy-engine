import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TPhysicsBodyWrapper } from './TPhysicsBodyWrapper';

export type TPhysicsRegistry = TProtectedRegistry<TAbstractEntityRegistry<TPhysicsBodyWrapper>>;
