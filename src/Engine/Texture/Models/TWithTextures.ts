import type { Material } from 'three';

import type { TMaterialPackParams, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';

export type TWithTextures = Readonly<{
  loadAndApplyMaterialTexturePack: (pack: TMaterialPackParams<TMaterialTexturePack>) => Promise<Material>;
}>;
