import type { Material } from 'three';

import type { IMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';

export type IWithTextures = Readonly<{
  loadAndApplyMaterialTexturePack: (pack: IMaterialPackParams<TMaterialTexturePack>) => Promise<Material>;
}>;
