import type { Material } from 'three';

import type { IMaterialProps } from '@/Engine/Material';

import type { IMaterialTexturePack } from './IMaterialTexturePack';

export type IWithTexturesActor = Readonly<{
  loadAndApplyMaterialTexturePack: (pack: IMaterialProps<IMaterialTexturePack>) => Promise<Material>;
}>;
