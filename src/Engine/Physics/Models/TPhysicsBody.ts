import type { TWrapper } from '@/Engine/Abstract';

import type { TWithPhysicsBodyFacadeEntities } from './TWithPhysicsBodyFacadeEntities';

export type TPhysicsBody = Omit<TWrapper<unknown>, 'entity'> & TWithPhysicsBodyFacadeEntities;
