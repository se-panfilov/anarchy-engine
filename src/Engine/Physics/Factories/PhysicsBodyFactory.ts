import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParamsBody as configToParams } from '@/Engine/Physics/Adapters';
import type { TPhysicsBodyFacade, TPhysicsBodyFactory, TPhysicsBodyParams, TPhysicsFacadeDependencies } from '@/Engine/Physics/Models';
import { PhysicsBodyFacade } from '@/Engine/Physics/Wrappers';

const factory: TReactiveFactoryWithDependencies<TPhysicsBodyFacade, TPhysicsBodyParams, TPhysicsFacadeDependencies> = ReactiveFactoryWithDependencies(FactoryType.PhysicsBody, PhysicsBodyFacade);
export const PhysicsBodyFactory = (): TPhysicsBodyFactory => ({ ...factory, configToParams });
