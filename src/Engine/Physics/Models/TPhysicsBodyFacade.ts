import type { TWrapper } from '@/Engine/Abstract';

import type { TWithPhysicsBodyFacadeEntities } from './TWithPhysicsBodyFacadeEntities';

export type TPhysicsBodyFacade = Omit<TWrapper<unknown>, 'entity'> & TWithPhysicsBodyFacadeEntities;
