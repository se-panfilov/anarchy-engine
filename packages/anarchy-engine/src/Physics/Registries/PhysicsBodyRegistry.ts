import { AbstractEntityRegistry, RegistryType } from '@hellpig/anarchy-engine/Abstract';
import type { TPhysicsBody, TPhysicsBodyRegistry } from '@hellpig/anarchy-engine/Physics/Models';

export function PhysicsBodyRegistry(): TPhysicsBodyRegistry {
  return AbstractEntityRegistry<TPhysicsBody>(RegistryType.PhysicsBody);
}
