import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParams } from '@/Engine/Physics/Adapters';
import type { TPhysicsBodyFactory, TPhysicsBodyWrapper, TPhysicsPresetParams } from '@/Engine/Physics/Models';
import { PhysicsBodyWrapper } from '@/Engine/Physics/Wrappers';

const factory: TReactiveFactory<TPhysicsBodyWrapper, TPhysicsPresetParams> = { ...ReactiveFactory(FactoryType.Physics, PhysicsBodyWrapper) };
export const PhysicsBodyFactory = (): TPhysicsBodyFactory => ({ ...factory, configToParams });
