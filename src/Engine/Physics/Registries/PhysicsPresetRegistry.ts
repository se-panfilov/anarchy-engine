import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsBodyParams, TPhysicsPresetRegistry } from '@/Engine/Physics/Models';

export const PhysicsPresetRegistry = (): TPhysicsPresetRegistry => RegistryFacade(AbstractSimpleRegistry<TPhysicsBodyParams>(RegistryType.PhysicsPreset));
