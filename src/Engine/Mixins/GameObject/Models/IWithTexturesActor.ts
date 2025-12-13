import type { MeshBasicMaterialParameters } from 'three';

import type { IMaterialTexturePack } from '@/Engine/Domains/Texture';

// TODO (S.Panfilov) CWP
// type IWithTexturesActor

export type IWithTexturesActor = {
  useTextureAsMaterial: (maps: MeshBasicMaterialParameters) => void;
  loadMaterialTexturePack: (texturePack: IMaterialTexturePack) => Promise<void>;
};
