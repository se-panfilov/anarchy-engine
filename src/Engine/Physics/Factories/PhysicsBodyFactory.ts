import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Physics/Adapters';
import type { TPhysicsBodyFactory, TPhysicsBodyFacade, TPhysicsPresetParams } from '@/Engine/Physics/Models';
import { PhysicsBodyFacade } from '@/Engine/Physics/Wrappers';

const factory: TReactiveFactory<TPhysicsBodyFacade, TPhysicsPresetParams> = { ...ReactiveFactory(FactoryType.Physics, PhysicsBodyFacade) };
export const PhysicsBodyFactory = (): TPhysicsBodyFactory => ({ ...factory, configToParams });
