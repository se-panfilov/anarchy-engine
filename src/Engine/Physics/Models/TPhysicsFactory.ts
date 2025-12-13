import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TPhysicsBodyWrapper } from './TPhysicsBodyWrapper';
import type { TPhysicsConfig } from './TPhysicsConfig';
import type { TPhysicsParams } from './TPhysicsParams';

export type TPhysicsFactory = TReactiveFactory<TPhysicsBodyWrapper, TPhysicsParams> & TParamsFromConfig<TPhysicsConfig, TPhysicsParams> & TDestroyable;
