import type { TParamsFromConfig, TReactiveFactory } from '@/Abstract';

import type { TPhysicsBody } from './TPhysicsBody';
import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsDependencies } from './TPhysicsDependencies';

export type TPhysicsBodyFactory = TReactiveFactory<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies> & TParamsFromConfig<TPhysicsBodyConfig, TPhysicsBodyParams>;
