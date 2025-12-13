import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsBody, TPhysicsBodyRegistry } from '@/Engine/Physics/Models';

export const PhysicsBodyRegistry = (): TPhysicsBodyRegistry => RegistryFacade(AbstractEntityRegistry<TPhysicsBody>(RegistryType.PhysicsBody));
