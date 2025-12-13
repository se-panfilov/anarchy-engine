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
} from '@/Engine/Material';

import type { ITexture } from './ITexture';

export type IBasicTextureUploaded = Readonly<{ [key in IBasicMaterialPackKeys]?: ITexture }>;
export type IDepthTextureUploaded = Readonly<{ [key in IDepthMaterialPackKeys]?: ITexture }>;
export type IDistanceTextureUploaded = Readonly<{ [key in IDistanceMaterialPackKeys]?: ITexture }>;
export type INormalTextureUploaded = Readonly<{ [key in INormalMaterialPackKeys]?: ITexture }>;
export type IMatcapTextureUploaded = Readonly<{ [key in IMatcapMaterialPackKeys]?: ITexture }>;
export type ILambertTextureUploaded = Readonly<{ [key in ILambertMaterialPackKeys]?: ITexture }>;
export type IPhongTextureUploaded = Readonly<{ [key in IPhongMaterialPackKeys]?: ITexture }>;
export type IPhysicalTextureUploaded = Readonly<{ [key in IPhysicalMaterialPackKeys]?: ITexture }>;
export type IToonTextureUploaded = Readonly<{ [key in IToonMaterialPackKeys]?: ITexture }>;
export type IStandardTextureUploaded = Readonly<{ [key in IStandardMaterialPackKeys]?: ITexture }>;
export type IPointsTextureUploaded = Readonly<{ [key in IPointsMaterialPackKeys]?: ITexture }>;

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
