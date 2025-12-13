import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsBodyFacadeFactory = TReactiveFactory<TPhysicsBodyFacade, TPhysicsBodyParams> & TParamsFromConfig<TPhysicsBodyConfig, TPhysicsBodyParams> & TDestroyable;
