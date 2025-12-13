import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TPhysicsBody } from './TPhysicsBody';
import type { TPhysicsBodyConfig } from './TPhysicsBodyConfig';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

export type TPhysicsBodyFactory = TReactiveFactory<TPhysicsBody, TPhysicsBodyParams> & TParamsFromConfig<TPhysicsBodyConfig, TPhysicsBodyParams> & TDestroyable;
