import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { configToParamsPreset } from '@/Engine/Physics/Adapters';
import type { TPhysicsBodyConfig, TPhysicsBodyParams, TPhysicsPresetRegistry, TPhysicsPresetsService } from '@/Engine/Physics/Models';

export function PhysicsPresetsService(registry: TPhysicsPresetRegistry): TPhysicsPresetsService {
  const addPresets = (presets: ReadonlyArray<TPhysicsBodyParams>): void => presets.forEach((preset: TPhysicsBodyParams) => registry.add(preset.presetName, preset));
  const addPresetsFromConfig = (presets: ReadonlyArray<TPhysicsBodyConfig>): void => addPresets(presets.map(configToParamsPreset));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => registry.destroy());

  return {
    addPresets,
    addPresetsFromConfig,
    getRegistry: (): TPhysicsPresetRegistry => registry,
    ...destroyable
  };
}
