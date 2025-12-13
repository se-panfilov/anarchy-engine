import type { TDestroyable } from '@/Engine/Mixins';
import { destroyableMixin } from '@/Engine/Mixins';
import { configToParamsPreset } from '@/Engine/Physics/Adapters';
import type { TPhysicsPresetConfig, TPhysicsPresetParams, TPhysicsPresetRegistry, TPhysicsPresetsService } from '@/Engine/Physics/Models';

export function PhysicsPresetsService(registry: TPhysicsPresetRegistry): TPhysicsPresetsService {
  const addPresets = (presets: ReadonlyArray<TPhysicsPresetParams>): void => presets.forEach((preset: TPhysicsPresetParams) => registry.add(preset.name, preset));
  const addPresetsFromConfig = (presets: ReadonlyArray<TPhysicsPresetConfig>): void => addPresets(presets.map(configToParamsPreset));

  const destroyable: TDestroyable = destroyableMixin();
  destroyable.destroyed$.subscribe(() => registry.destroy());

  return {
    addPresets,
    addPresetsFromConfig,
    getRegistry: (): TPhysicsPresetRegistry => registry,
    ...destroyable
  };
}
