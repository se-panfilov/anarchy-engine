import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';

export type TWithMaterialConfigPresetWithOverrides = Readonly<{
  // TODO 8.0.0. MODELS: check name match material's in config
  // TODO 8.0.0. MODELS: allow to override material preset's here in config
  presetName: string;
}> &
  TMaterialPackConfig<TMaterialTexturePack>;
