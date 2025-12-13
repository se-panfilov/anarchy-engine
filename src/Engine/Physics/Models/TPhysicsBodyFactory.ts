import type { TParamsFromConfig, TReactiveFactoryWithDependencies } from '@/Engine/Abstract';

import type { TPhysicsBody } from './TPhysicsBody';
import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsDependencies } from './TPhysicsDependencies';

export type TPhysicsBodyFactory = TReactiveFactoryWithDependencies<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies> & TParamsFromConfig<TPhysicsBodyConfig, TPhysicsBodyParams>;
