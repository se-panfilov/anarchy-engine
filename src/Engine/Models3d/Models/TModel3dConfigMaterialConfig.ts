import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';

export type TModel3dConfigMaterialConfig = Readonly<{
  // TODO MODELS: check name match material's in config
  // TODO MODELS: allow to override material preset's here in config
  presetName: string;
}> &
  TMaterialPackConfig<TMaterialTexturePack>;
