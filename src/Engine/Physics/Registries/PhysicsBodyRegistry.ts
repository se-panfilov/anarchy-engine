import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsBodyFacade, TPhysicsBodyRegistry } from '@/Engine/Physics/Models';

export const PhysicsBodyRegistry = (): TPhysicsBodyRegistry => RegistryFacade(AbstractEntityRegistry<TPhysicsBodyFacade>(RegistryType.PhysicsBody));
