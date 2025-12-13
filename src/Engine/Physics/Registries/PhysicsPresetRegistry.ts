import { AbstractSimpleRegistry, RegistryFacade, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsPresetParams, TPhysicsPresetRegistry } from '@/Engine/Physics/Models';

export const PhysicsPresetRegistry = (): TPhysicsPresetRegistry => RegistryFacade(AbstractSimpleRegistry<TPhysicsPresetParams>(RegistryType.PhysicsPreset));
