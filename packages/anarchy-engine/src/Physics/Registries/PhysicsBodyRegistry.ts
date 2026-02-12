import { AbstractEntityRegistry, RegistryType } from '@Anarchy/Engine/Abstract';
import type { TPhysicsBody, TPhysicsBodyRegistry } from '@Anarchy/Engine/Physics/Models';

export function PhysicsBodyRegistry(): TPhysicsBodyRegistry {
  return AbstractEntityRegistry<TPhysicsBody>(RegistryType.PhysicsBody);
}
