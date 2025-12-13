import { AbstractEntityRegistry, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsBody, TPhysicsBodyRegistry } from '@/Engine/Physics/Models';

export const PhysicsBodyRegistry = (): TPhysicsBodyRegistry => AbstractEntityRegistry<TPhysicsBody>(RegistryType.PhysicsBody);
