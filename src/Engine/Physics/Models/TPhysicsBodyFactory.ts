import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';
import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';

export type TPhysicsBodyFactory = TReactiveFactory<TPhysicsBodyFacade, TPhysicsPresetParams> & TParamsFromConfig<TPhysicsPresetConfig, TPhysicsPresetParams> & TDestroyable;
