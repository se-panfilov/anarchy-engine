import type { MeshBasicMaterialParameters } from 'three';

import type { IMaterialTexturePack } from '@/Engine/Domains/Texture';

export type IWithTexturesActor = {
  useTextureAsMaterial: (maps: MeshBasicMaterialParameters) => void;
  loadTexturePack: (texturePack: IMaterialTexturePack) => Promise<void>;
};
