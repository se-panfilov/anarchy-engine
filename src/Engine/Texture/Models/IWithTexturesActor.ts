import type { Material } from 'three';

import type { IMaterialProps } from '@/Engine/Material';

import type { IMaterialTexturePack } from './IMaterialTexturePack';

export type IWithTexturesActor = {
  loadAndApplyMaterialTexturePack: (pack: IMaterialProps<IMaterialTexturePack>) => Promise<Material>;
};
