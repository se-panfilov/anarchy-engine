import type {
  TBasicMaterialPackKeys,
  TDepthMaterialPackKeys,
  TDistanceMaterialPackKeys,
  TLambertMaterialPackKeys,
  TMatcapMaterialPackKeys,
  TNormalMaterialPackKeys,
  TPhongMaterialPackKeys,
  TPhysicalMaterialPackKeys,
  TStandardMaterialPackKeys,
  TToonMaterialPackKeys
} from '@/Engine/MaterialTexturePack';

import type { TTexture } from './TTexture';
import type {
  TBasicTextureUploaded,
  TDepthTextureUploaded,
  TDistanceTextureUploaded,
  TLambertTextureUploaded,
  TMatcapTextureUploaded,
  TNormalTextureUploaded,
  TPhongTextureUploaded,
  TPhysicalTextureUploaded,
  TStandardTextureUploaded,
  TToonTextureUploaded
} from './TTextureUploaded';

export type TGetAllTextures<T> = Readonly<{ all: () => Promise<T> }>;

export type TBasicTextureUploadPromises = Readonly<{ [key in TBasicMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TBasicTextureUploaded>>;
export type TDepthTextureUploadPromises = Readonly<{ [key in TDepthMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TDepthTextureUploaded>>;
export type TDistanceTextureUploadPromises = Readonly<{ [key in TDistanceMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TDistanceTextureUploaded>>;
export type TNormalTextureUploadPromises = Readonly<{ [key in TNormalMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TNormalTextureUploaded>>;
export type TMatcapTextureUploadPromises = Readonly<{ [key in TMatcapMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TMatcapTextureUploaded>>;
export type TLambertTextureUploadPromises = Readonly<{ [key in TLambertMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TLambertTextureUploaded>>;
export type TPhongTextureUploadPromises = Readonly<{ [key in TPhongMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TPhongTextureUploaded>>;
export type TPhysicalTextureUploadPromises = Readonly<{ [key in TPhysicalMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TPhysicalTextureUploaded>>;
export type TToonTextureUploadPromises = Readonly<{ [key in TToonMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TToonTextureUploaded>>;
export type TStandardTextureUploadPromises = Readonly<{ [key in TStandardMaterialPackKeys]?: Promise<TTexture> } & TGetAllTextures<TStandardTextureUploaded>>;

export type TTextureUploadPromises =
  | TBasicTextureUploadPromises
  | TDepthTextureUploadPromises
  | TDistanceTextureUploadPromises
  | TNormalTextureUploadPromises
  | TMatcapTextureUploadPromises
  | TLambertTextureUploadPromises
  | TPhongTextureUploadPromises
  | TPhysicalTextureUploadPromises
  | TToonTextureUploadPromises
  | TStandardTextureUploadPromises;
