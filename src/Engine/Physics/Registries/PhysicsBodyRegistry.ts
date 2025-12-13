import { AbstractEntityRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsBodyRegistry, TPhysicsBodyWrapper } from '@/Engine/Physics/Models';

export const PhysicsBodyRegistry = (): TPhysicsBodyRegistry => RegistryFacade(AbstractEntityRegistry<TPhysicsBodyWrapper>(RegistryType.PhysicsBody));
