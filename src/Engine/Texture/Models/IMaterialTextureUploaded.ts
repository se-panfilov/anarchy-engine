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
  IToonMaterialPackKeys,
  IWitMaterialProperty
} from '@/Engine/Material';

import type { ITexture } from './ITexture';

export type IBasicMaterialTextureUploaded = Readonly<{ [key in IBasicMaterialPackKeys]?: ITexture } & IWitMaterialProperty>;
export type IDepthMaterialTextureUploaded = Readonly<{ [key in IDepthMaterialPackKeys]?: ITexture }> & IWitMaterialProperty;
export type IDistanceMaterialTextureUploaded = Readonly<{ [key in IDistanceMaterialPackKeys]?: ITexture } & IWitMaterialProperty>;
export type INormalMaterialTextureUploaded = Readonly<{ [key in INormalMaterialPackKeys]?: ITexture } & IWitMaterialProperty>;
export type IMatcapMaterialTextureUploaded = Readonly<{ [key in IMatcapMaterialPackKeys]?: ITexture } & IWitMaterialProperty>;
export type ILambertMaterialTextureUploaded = Readonly<{ [key in ILambertMaterialPackKeys]?: ITexture } & IWitMaterialProperty>;
export type IPhongMaterialTextureUploaded = Readonly<{ [key in IPhongMaterialPackKeys]?: ITexture } & IWitMaterialProperty>;
export type IPhysicalMaterialTextureUploaded = Readonly<{ [key in IPhysicalMaterialPackKeys]?: ITexture } & IWitMaterialProperty>;
export type IToonMaterialTextureUploaded = Readonly<{ [key in IToonMaterialPackKeys]?: ITexture } & IWitMaterialProperty>;
export type IStandardMaterialTextureUploaded = Readonly<{ [key in IStandardMaterialPackKeys]?: ITexture } & IWitMaterialProperty>;

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
