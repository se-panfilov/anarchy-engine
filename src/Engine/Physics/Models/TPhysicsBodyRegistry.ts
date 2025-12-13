import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';

export type TPhysicsBodyRegistry = TProtectedRegistry<TAbstractEntityRegistry<TPhysicsBodyFacade>>;
