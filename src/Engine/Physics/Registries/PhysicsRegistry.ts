import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsRegistry, TPhysicsWrapper } from '@/Engine/Physics/Models';

export const PhysicsRegistry = (): TPhysicsRegistry => RegistryFacade(AbstractEntityRegistry<TPhysicsWrapper>(RegistryType.PhysicsObject));
