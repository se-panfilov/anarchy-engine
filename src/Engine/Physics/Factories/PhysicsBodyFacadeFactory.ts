import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsPreset } from '@/Engine/Physics/Adapters';
import type { TPhysicsBodyFacade, TPhysicsBodyFacadeFactory } from '@/Engine/Physics/Models';
import { PhysicsBodyFacade } from '@/Engine/Physics/Wrappers';

import type { TPhysicsBodyParams } from './TPhysicsBodyParams';

const factory: TReactiveFactory<TPhysicsBodyFacade, TPhysicsBodyParams> = { ...ReactiveFactory(FactoryType.PhysicsBody, PhysicsBodyFacade) };
export const PhysicsBodyFacadeFactory = (): TPhysicsBodyFacadeFactory => ({ ...factory, configToParams: configToParamsPreset });
