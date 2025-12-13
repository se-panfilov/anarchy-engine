import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParamsBody as configToParams } from '@/Engine/Physics/Adapters';
import { PhysicsBody } from '@/Engine/Physics/Entities';
import type { TPhysicsBody, TPhysicsBodyFactory, TPhysicsBodyParams, TPhysicsDependencies } from '@/Engine/Physics/Models';

const factory: TReactiveFactoryWithDependencies<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies> = ReactiveFactoryWithDependencies(FactoryType.PhysicsBody, PhysicsBody);
// eslint-disable-next-line functional/immutable-data
export const PhysicsBodyFactory = (): TPhysicsBodyFactory => Object.assign(factory, { configToParams });
