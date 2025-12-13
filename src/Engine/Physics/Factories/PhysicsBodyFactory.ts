import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsPreset } from '@/Engine/Physics/Adapters';
import type { TPhysicsBody, TPhysicsBodyFactory, TPhysicsBodyParams } from '@/Engine/Physics/Models';
import { PhysicsBodyFacade } from '@/Engine/Physics/Wrappers';

const factory: TReactiveFactory<TPhysicsBody, TPhysicsBodyParams> = { ...ReactiveFactory(FactoryType.PhysicsBody, PhysicsBodyFacade) };
export const PhysicsBodyFactory = (): TPhysicsBodyFactory => ({ ...factory, configToParams: configToParamsPreset });
