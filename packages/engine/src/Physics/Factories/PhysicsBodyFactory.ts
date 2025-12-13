import type { TReactiveFactory } from '@/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@/Engine/Abstract';
import { configToParamsBody as configToParams } from '@/Engine/Physics/Adapters';
import { PhysicsBody } from '@/Engine/Physics/Entities';
import type { TPhysicsBody, TPhysicsBodyFactory, TPhysicsBodyParams, TPhysicsDependencies } from '@/Engine/Physics/Models';

export function PhysicsBodyFactory(): TPhysicsBodyFactory {
  const factory: TReactiveFactory<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies> = ReactiveFactory(FactoryType.PhysicsBody, PhysicsBody);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
