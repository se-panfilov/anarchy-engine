import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { physicsBodyConfigToParams } from '@Anarchy/Engine/Physics/Adapters';
import { PhysicsBody } from '@Anarchy/Engine/Physics/Entities';
import type { TPhysicsBody, TPhysicsBodyFactory, TPhysicsBodyParams, TPhysicsDependencies } from '@Anarchy/Engine/Physics/Models';

export function PhysicsBodyFactory(): TPhysicsBodyFactory {
  const factory: TReactiveFactory<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies> = ReactiveFactory(FactoryType.PhysicsBody, PhysicsBody);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: physicsBodyConfigToParams });
}
