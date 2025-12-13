import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsBodyWrapper, TPhysicsRegistry } from '@/Engine/Physics/Models';

export const PhysicsRegistry = (): TPhysicsRegistry => RegistryFacade(AbstractEntityRegistry<TPhysicsBodyWrapper>(RegistryType.PhysicsObject));
