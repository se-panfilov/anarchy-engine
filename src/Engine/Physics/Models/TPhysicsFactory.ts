import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TPhysicsConfig } from './TPhysicsConfig';
import type { TPhysicsParams } from './TPhysicsParams';
import type { TPhysicsWrapper } from './TPhysicsWrapper';

export type TPhysicsFactory = TReactiveFactory<TPhysicsWrapper, TPhysicsParams> & TParamsFromConfig<TPhysicsConfig, TPhysicsParams> & TDestroyable;
