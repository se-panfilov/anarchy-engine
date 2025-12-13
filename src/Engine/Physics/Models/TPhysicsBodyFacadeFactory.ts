import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TPhysicsBodyFacade } from './TPhysicsBodyFacade';
import type { TPhysicsBodyParams } from './TPhysicsBodyParams';
import type { TPhysicsPresetConfig } from './TPhysicsPresetConfig';

export type TPhysicsBodyFacadeFactory = TReactiveFactory<TPhysicsBodyFacade, TPhysicsBodyParams> & TParamsFromConfig<TPhysicsPresetConfig, TPhysicsBodyParams> & TDestroyable;
