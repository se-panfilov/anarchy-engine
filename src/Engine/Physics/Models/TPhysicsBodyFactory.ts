import type { TParamsFromConfig, TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsFacadeDependencies } from './TPhysicsFacadeDependencies';

export type TPhysicsBodyFactory = TReactiveFactoryWithDependencies<TPhysicsBodyFacade, TPhysicsBodyParams, TPhysicsFacadeDependencies> &
  TParamsFromConfig<TPhysicsBodyConfig, TPhysicsBodyParams> &
  TDestroyable;
