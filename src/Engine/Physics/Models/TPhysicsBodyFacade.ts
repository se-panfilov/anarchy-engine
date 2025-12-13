import type { TFacade } from '@/Engine/Abstract';

import type { TPhysicsBodyFacadeEntities } from './TPhysicsBodyFacadeEntities';
import type { TWithPhysicsBodyFacadeEntities } from './TWithPhysicsBodyFacadeEntities';

export type TPhysicsBodyFacade = Omit<TFacade<TPhysicsBodyFacadeEntities>, 'entity'> & TWithPhysicsBodyFacadeEntities;
