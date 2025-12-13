import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';

export type TPhysicsBodyFacadeRegistry = TProtectedRegistry<TAbstractEntityRegistry<TPhysicsBodyFacade>>;
