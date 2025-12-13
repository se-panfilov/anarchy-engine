import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsBodyFacade, TPhysicsBodyFacadeRegistry } from '@/Engine/Physics/Models';

export const PhysicsBodyFacadeRegistry = (): TPhysicsBodyFacadeRegistry => RegistryFacade(AbstractEntityRegistry<TPhysicsBodyFacade>(RegistryType.PhysicsBody));
