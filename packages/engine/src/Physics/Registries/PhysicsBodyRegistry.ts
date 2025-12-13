import { AbstractEntityRegistry, RegistryType } from '@Engine/Abstract';
import type { TPhysicsBody, TPhysicsBodyRegistry } from '@Engine/Physics/Models';

export function PhysicsBodyRegistry(): TPhysicsBodyRegistry {
  return AbstractEntityRegistry<TPhysicsBody>(RegistryType.PhysicsBody);
}
