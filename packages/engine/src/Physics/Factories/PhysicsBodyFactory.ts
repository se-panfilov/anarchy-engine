import type { TReactiveFactory } from '@/Abstract';
import { FactoryType, ReactiveFactory } from '@/Abstract';
import { configToParamsBody as configToParams } from '@/Physics/Adapters';
import { PhysicsBody } from '@/Physics/Entities';
import type { TPhysicsBody, TPhysicsBodyFactory, TPhysicsBodyParams, TPhysicsDependencies } from '@/Physics/Models';

export function PhysicsBodyFactory(): TPhysicsBodyFactory {
  const factory: TReactiveFactory<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies> = ReactiveFactory(FactoryType.PhysicsBody, PhysicsBody);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams });
}
