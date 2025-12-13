import type { Material } from 'three';

import type { IMaterialPackParams, IMaterialTexturePack } from '@/Engine/MaterialTexturePack';

export type IWithTextures = Readonly<{
  loadAndApplyMaterialTexturePack: (pack: IMaterialPackParams<IMaterialTexturePack>) => Promise<Material>;
}>;
