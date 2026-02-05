import type { TParamsFromConfig, TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';

import type { TPhysicsBody } from './TPhysicsBody';
import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsDependencies } from './TPhysicsDependencies';

export type TPhysicsBodyFactory = TReactiveFactory<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies> & TParamsFromConfig<TPhysicsBodyConfig, TPhysicsBodyParams>;
