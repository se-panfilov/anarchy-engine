import { AbstractSimpleRegistry, RegistryType } from '@/Engine/Abstract';
import type { TPhysicsPresetConfig, TPhysicsPresetParams, TPhysicsPresetRegistry } from '@/Engine/Physics/Models';
import { filterOutEmptyFields, isDefined, quaternionToXyzw, vector3ToXyz } from '@/Engine/Utils';

export function PhysicsPresetRegistry(): TPhysicsPresetRegistry {
  const registry = Object.assign(AbstractSimpleRegistry<TPhysicsPresetParams>(RegistryType.PhysicsPreset), {
    serialize: (): ReadonlyArray<TPhysicsPresetConfig> => {
      return registry.map((value: TPhysicsPresetParams): TPhysicsPresetConfig => {
        return filterOutEmptyFields({
          ...value,
          position: isDefined(value.position) ? vector3ToXyz(value.position) : undefined,
          rotation: isDefined(value.rotation) ? quaternionToXyzw(value.rotation) : undefined
        });
      });
    }
  });

  return registry;
}
