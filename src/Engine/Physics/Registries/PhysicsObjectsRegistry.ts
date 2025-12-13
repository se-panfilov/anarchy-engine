import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsObjectParams, TPhysicsObjectRegistry } from '@/Engine/Physics/Models';

export const PhysicsObjectsRegistry = (): TPhysicsObjectRegistry => RegistryFacade(AbstractSimpleRegistry<TPhysicsObjectParams>(RegistryType.PhysicsObject));
