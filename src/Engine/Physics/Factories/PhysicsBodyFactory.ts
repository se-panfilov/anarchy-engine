import { PhysicsBody } from 'src/Engine/Physics/Entities';

import type { TReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactoryWithDependencies } from '@/Engine/Abstract';
import { configToParamsBody as configToParams } from '@/Engine/Physics/Adapters';
import type { TPhysicsBody, TPhysicsBodyFactory, TPhysicsBodyParams, TPhysicsDependencies } from '@/Engine/Physics/Models';

const factory: TReactiveFactoryWithDependencies<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies> = ReactiveFactoryWithDependencies(FactoryType.PhysicsBody, PhysicsBody);
export const PhysicsBodyFactory = (): TPhysicsBodyFactory => ({ ...factory, configToParams });
