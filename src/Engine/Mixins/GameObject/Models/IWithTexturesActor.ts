import type { IMaterialTexturePack, IMaterialTextureUploaded } from '@/Engine/Domains/Texture';

export type IWithTexturesActor = {
  useTextureAsMaterial: (maps: IMaterialTextureUploaded) => void;
  loadMaterialTexturePack: (pack: IMaterialTexturePack) => Promise<void>;
};
