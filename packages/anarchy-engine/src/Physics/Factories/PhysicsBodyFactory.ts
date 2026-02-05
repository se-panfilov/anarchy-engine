import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { physicsBodyConfigToParams } from '@hellpig/anarchy-engine/Physics/Adapters';
import { PhysicsBody } from '@hellpig/anarchy-engine/Physics/Entities';
import type { TPhysicsBody, TPhysicsBodyFactory, TPhysicsBodyParams, TPhysicsDependencies } from '@hellpig/anarchy-engine/Physics/Models';

export function PhysicsBodyFactory(): TPhysicsBodyFactory {
  const factory: TReactiveFactory<TPhysicsBody, TPhysicsBodyParams, TPhysicsDependencies> = ReactiveFactory(FactoryType.PhysicsBody, PhysicsBody);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(factory, { configToParams: physicsBodyConfigToParams });
}
