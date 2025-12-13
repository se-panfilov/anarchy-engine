import type { MeshBasicMaterialParameters } from 'three';

import type { ITexturePack } from '@/Engine/Domains/Texture';

export type IWithTexturesActor = {
  useTexture: (maps: MeshBasicMaterialParameters) => void;
  loadTexturePack: (texturePack: ITexturePack) => Promise<void>;
};
