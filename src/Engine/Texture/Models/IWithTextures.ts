import type { Material } from 'three';

import type { IMaterialPackProps } from '@/Engine/Material';

import type { IMaterialTexturePack } from './IMaterialTexturePack';

export type IWithTextures = Readonly<{
  loadAndApplyMaterialTexturePack: (pack: IMaterialPackProps<IMaterialTexturePack>) => Promise<Material>;
}>;
