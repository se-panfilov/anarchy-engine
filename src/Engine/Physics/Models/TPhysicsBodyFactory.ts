import type { TParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TPhysicsBodyWrapper } from './TPhysicsBodyWrapper';
import type { TPhysicsConfig } from './TPhysicsConfig';
import type { TPhysicsPresetParams } from './TPhysicsPresetParams';

export type TPhysicsBodyFactory = TReactiveFactory<TPhysicsBodyWrapper, TPhysicsPresetParams> & TParamsFromConfig<TPhysicsConfig, TPhysicsPresetParams> & TDestroyable;
