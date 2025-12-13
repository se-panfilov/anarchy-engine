import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsBodyRegistry, TPhysicsBodyFacade } from '@/Engine/Physics/Models';

export const PhysicsBodyRegistry = (): TPhysicsBodyRegistry => RegistryFacade(AbstractEntityRegistry<TPhysicsBodyFacade>(RegistryType.PhysicsBody));
