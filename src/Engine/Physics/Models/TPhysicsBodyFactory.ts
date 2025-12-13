import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';
import type { TPhysicsConfig } from './TPhysicsConfig';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';

export type TPhysicsBodyFactory = TReactiveFactory<TPhysicsBodyFacade, TPhysicsPresetParams> & TParamsFromConfig<TPhysicsConfig, TPhysicsPresetParams> & TDestroyable;
