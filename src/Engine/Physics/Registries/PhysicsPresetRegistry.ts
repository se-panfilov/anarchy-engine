import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsPresetParams, TPhysicsPresetRegistry } from '@/Engine/Physics/Models';

export const PhysicsPresetRegistry = (): TPhysicsPresetRegistry => AbstractSimpleRegistry<TPhysicsPresetParams>(RegistryType.PhysicsPreset);
