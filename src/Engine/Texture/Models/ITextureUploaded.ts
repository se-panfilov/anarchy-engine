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

export type IBasicTextureUploaded = Readonly<{ [key in TBasicMaterialPackKeys]?: TTexture }>;
export type IDepthTextureUploaded = Readonly<{ [key in TDepthMaterialPackKeys]?: TTexture }>;
export type IDistanceTextureUploaded = Readonly<{ [key in TDistanceMaterialPackKeys]?: TTexture }>;
export type INormalTextureUploaded = Readonly<{ [key in TNormalMaterialPackKeys]?: TTexture }>;
export type IMatcapTextureUploaded = Readonly<{ [key in TMatcapMaterialPackKeys]?: TTexture }>;
export type ILambertTextureUploaded = Readonly<{ [key in TLambertMaterialPackKeys]?: TTexture }>;
export type IPhongTextureUploaded = Readonly<{ [key in TPhongMaterialPackKeys]?: TTexture }>;
export type IPhysicalTextureUploaded = Readonly<{ [key in TPhysicalMaterialPackKeys]?: TTexture }>;
export type IToonTextureUploaded = Readonly<{ [key in TToonMaterialPackKeys]?: TTexture }>;
export type IStandardTextureUploaded = Readonly<{ [key in TStandardMaterialPackKeys]?: TTexture }>;
export type IPointsTextureUploaded = Readonly<{ [key in TPointsMaterialPackKeys]?: TTexture }>;

export type ITextureUploaded =
  | IBasicTextureUploaded
  | IDepthTextureUploaded
  | IDistanceTextureUploaded
  | INormalTextureUploaded
  | IMatcapTextureUploaded
  | ILambertTextureUploaded
  | IPhongTextureUploaded
  | IPhysicalTextureUploaded
  | IToonTextureUploaded
  | IStandardTextureUploaded
  | IPointsTextureUploaded;
