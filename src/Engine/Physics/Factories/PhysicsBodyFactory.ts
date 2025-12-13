import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsBody as configToParams } from '@/Engine/Physics/Adapters';
import type { TPhysicsBodyFacade, TPhysicsBodyFactory, TPhysicsBodyParams } from '@/Engine/Physics/Models';
import { PhysicsBodyFacade } from '@/Engine/Physics/Wrappers';

const factory: TReactiveFactory<TPhysicsBodyFacade, TPhysicsBodyParams> = { ...ReactiveFactory(FactoryType.PhysicsBody, PhysicsBodyFacade) };
// const factory: TReactiveFactory<TPhysicsBodyFacade, TPhysicsBodyParams> = { ...ReactiveFactory(FactoryType.PhysicsBody, PhysicsBodyFacade as TCreateEntityFactoryFn<TPhysicsBodyFacade, TPhysicsBodyParams>) };
export const PhysicsBodyFactory = (): TPhysicsBodyFactory => ({ ...factory, configToParams });
