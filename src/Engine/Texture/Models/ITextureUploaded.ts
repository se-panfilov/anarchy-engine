import type {
  IBasicMaterialPackKeys,
  IDepthMaterialPackKeys,
  IDistanceMaterialPackKeys,
  ILambertMaterialPackKeys,
  IMatcapMaterialPackKeys,
  INormalMaterialPackKeys,
  IPhongMaterialPackKeys,
  IPhysicalMaterialPackKeys,
  IPointsMaterialPackKeys,
  IStandardMaterialPackKeys,
  IToonMaterialPackKeys
} from '@/Engine/MaterialTexturePack';

import type { TTexture } from './TTexture';

export type IBasicTextureUploaded = Readonly<{ [key in IBasicMaterialPackKeys]?: TTexture }>;
export type IDepthTextureUploaded = Readonly<{ [key in IDepthMaterialPackKeys]?: TTexture }>;
export type IDistanceTextureUploaded = Readonly<{ [key in IDistanceMaterialPackKeys]?: TTexture }>;
export type INormalTextureUploaded = Readonly<{ [key in INormalMaterialPackKeys]?: TTexture }>;
export type IMatcapTextureUploaded = Readonly<{ [key in IMatcapMaterialPackKeys]?: TTexture }>;
export type ILambertTextureUploaded = Readonly<{ [key in ILambertMaterialPackKeys]?: TTexture }>;
export type IPhongTextureUploaded = Readonly<{ [key in IPhongMaterialPackKeys]?: TTexture }>;
export type IPhysicalTextureUploaded = Readonly<{ [key in IPhysicalMaterialPackKeys]?: TTexture }>;
export type IToonTextureUploaded = Readonly<{ [key in IToonMaterialPackKeys]?: TTexture }>;
export type IStandardTextureUploaded = Readonly<{ [key in IStandardMaterialPackKeys]?: TTexture }>;
export type IPointsTextureUploaded = Readonly<{ [key in IPointsMaterialPackKeys]?: TTexture }>;

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
