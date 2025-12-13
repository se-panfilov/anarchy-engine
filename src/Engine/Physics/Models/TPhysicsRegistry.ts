import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TPhysicsWrapper } from './TPhysicsWrapper';

export type TPhysicsRegistry = TProtectedRegistry<TAbstractEntityRegistry<TPhysicsWrapper>>;
