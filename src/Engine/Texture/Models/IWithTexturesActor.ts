import type { Material } from 'three';

import type { IMaterialTexturePack } from './IMaterialTexturePack';

export type IWithTexturesActor = {
  loadAndApplyMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<Material>;
};
