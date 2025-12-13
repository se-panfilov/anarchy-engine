import type { Material } from 'three';

import type { IMaterialPackProps, IMaterialTexturePack } from '@/Engine/MaterialTexturePack';

export type IWithTextures = Readonly<{
  loadAndApplyMaterialTexturePack: (pack: IMaterialPackProps<IMaterialTexturePack>) => Promise<Material>;
}>;
