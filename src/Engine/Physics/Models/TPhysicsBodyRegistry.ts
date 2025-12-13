import type { TAbstractEntityRegistry, TProtectedRegistry } from '@/Engine/Abstract';

import type { TPhysicsBody } from './TPhysicsBody';

export type TPhysicsBodyRegistry = TProtectedRegistry<TAbstractEntityRegistry<TPhysicsBody>>;
