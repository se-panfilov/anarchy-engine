import type {
  TBasicMaterialPackKeys,
  TDepthMaterialPackKeys,
  TDistanceMaterialPackKeys,
  TLambertMaterialPackKeys,
  TMatcapMaterialPackKeys,
  TNormalMaterialPackKeys,
  TPhongMaterialPackKeys,
  TPhysicalMaterialPackKeys,
  TPointsMaterialPackKeys,
  TStandardMaterialPackKeys,
  TToonMaterialPackKeys
} from '@/Engine/MaterialTexturePack';

import type { TTexture } from './TTexture';

export type TBasicTextureUploaded = Readonly<{ [key in TBasicMaterialPackKeys]?: TTexture }>;
export type TDepthTextureUploaded = Readonly<{ [key in TDepthMaterialPackKeys]?: TTexture }>;
export type TDistanceTextureUploaded = Readonly<{ [key in TDistanceMaterialPackKeys]?: TTexture }>;
export type TNormalTextureUploaded = Readonly<{ [key in TNormalMaterialPackKeys]?: TTexture }>;
export type TMatcapTextureUploaded = Readonly<{ [key in TMatcapMaterialPackKeys]?: TTexture }>;
export type TLambertTextureUploaded = Readonly<{ [key in TLambertMaterialPackKeys]?: TTexture }>;
export type TPhongTextureUploaded = Readonly<{ [key in TPhongMaterialPackKeys]?: TTexture }>;
export type TPhysicalTextureUploaded = Readonly<{ [key in TPhysicalMaterialPackKeys]?: TTexture }>;
export type TToonTextureUploaded = Readonly<{ [key in TToonMaterialPackKeys]?: TTexture }>;
export type TStandardTextureUploaded = Readonly<{ [key in TStandardMaterialPackKeys]?: TTexture }>;
export type TPointsTextureUploaded = Readonly<{ [key in TPointsMaterialPackKeys]?: TTexture }>;

export type TTextureUploaded =
  | TBasicTextureUploaded
  | TDepthTextureUploaded
  | TDistanceTextureUploaded
  | TNormalTextureUploaded
  | TMatcapTextureUploaded
  | TLambertTextureUploaded
  | TPhongTextureUploaded
  | TPhysicalTextureUploaded
  | TToonTextureUploaded
  | TStandardTextureUploaded
  | TPointsTextureUploaded;
