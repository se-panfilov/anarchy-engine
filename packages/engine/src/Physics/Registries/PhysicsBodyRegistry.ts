import { AbstractEntityRegistry, RegistryType } from '@/Abstract';
import type { TPhysicsBody, TPhysicsBodyRegistry } from '@/Physics/Models';

export function PhysicsBodyRegistry(): TPhysicsBodyRegistry {
  return AbstractEntityRegistry<TPhysicsBody>(RegistryType.PhysicsBody);
}
