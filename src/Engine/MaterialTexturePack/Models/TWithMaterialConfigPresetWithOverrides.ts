import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';

// TODO 8.0.0. MODELS: do we really need this type?
// TODO 9.0.0. RESOURCES: Maybe no need in overrides, just create a new instance of a resource
export type TWithMaterialConfigPresetWithOverrides = Readonly<{
  // TODO 8.0.0. MODELS: check name match material's in config
  // TODO 8.0.0. MODELS: allow to override material preset's here in config
  presetName: string;
}> &
  TMaterialPackConfig<TMaterialTexturePack>;
