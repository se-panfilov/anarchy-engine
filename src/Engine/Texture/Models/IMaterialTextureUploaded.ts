import type {
  IBasicMaterialPackKeys,
  IDepthMaterialPackKeys,
  IDistanceMaterialPackKeys,
  ILambertMaterialPackKeys,
  IMatcapMaterialPackKeys,
  INormalMaterialPackKeys,
  IPhongMaterialPackKeys,
  IPhysicalMaterialPackKeys,
  IStandardMaterialPackKeys,
  IToonMaterialPackKeys
} from '@/Engine/Material';

import type { ITexture } from './ITexture';

export type IBasicMaterialTextureUploaded = Readonly<{ [key in IBasicMaterialPackKeys]?: ITexture }>;
export type IDepthMaterialTextureUploaded = Readonly<{ [key in IDepthMaterialPackKeys]?: ITexture }>;
export type IDistanceMaterialTextureUploaded = Readonly<{ [key in IDistanceMaterialPackKeys]?: ITexture }>;
export type INormalMaterialTextureUploaded = Readonly<{ [key in INormalMaterialPackKeys]?: ITexture }>;
export type IMatcapMaterialTextureUploaded = Readonly<{ [key in IMatcapMaterialPackKeys]?: ITexture }>;
export type ILambertMaterialTextureUploaded = Readonly<{ [key in ILambertMaterialPackKeys]?: ITexture }>;
export type IPhongMaterialTextureUploaded = Readonly<{ [key in IPhongMaterialPackKeys]?: ITexture }>;
export type IPhysicalMaterialTextureUploaded = Readonly<{ [key in IPhysicalMaterialPackKeys]?: ITexture }>;
export type IToonMaterialTextureUploaded = Readonly<{ [key in IToonMaterialPackKeys]?: ITexture }>;
export type IStandardMaterialTextureUploaded = Readonly<{ [key in IStandardMaterialPackKeys]?: ITexture }>;

export type IMaterialTextureUploaded =
  | IBasicMaterialTextureUploaded
  | IDepthMaterialTextureUploaded
  | IDistanceMaterialTextureUploaded
  | INormalMaterialTextureUploaded
  | IMatcapMaterialTextureUploaded
  | ILambertMaterialTextureUploaded
  | IPhongMaterialTextureUploaded
  | IPhysicalMaterialTextureUploaded
  | IToonMaterialTextureUploaded
  | IStandardMaterialTextureUploaded;
