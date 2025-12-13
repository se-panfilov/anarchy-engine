import type {
  IBasicMaterialPackKeys,
  IDepthMaterialPackKeys,
  IDistanceMaterialPackKeys,
  ILamberMaterialPackKeys,
  IMatcapMaterialPackKeys,
  INormalMaterialPackKeys,
  IPhongMaterialPackKeys,
  IPhysicalMaterialPackKeys,
  IStandardMaterialPackKeys,
  IToonMaterialPackKeys
} from './IMaterialPackKeys.ts';
import type { ITexture } from './ITexture';

export type IBasicMaterialTextureUploaded = { [key in IBasicMaterialPackKeys]?: ITexture };
export type IDepthMaterialTextureUploaded = { [key in IDepthMaterialPackKeys]?: ITexture };
export type IDistanceMaterialTextureUploaded = { [key in IDistanceMaterialPackKeys]?: ITexture };
export type INormalMaterialTextureUploaded = { [key in INormalMaterialPackKeys]?: ITexture };
export type IMatcapMaterialTextureUploaded = { [key in IMatcapMaterialPackKeys]?: ITexture };
export type ILamberMaterialTextureUploaded = { [key in ILamberMaterialPackKeys]?: ITexture };
export type IPhongMaterialTextureUploaded = { [key in IPhongMaterialPackKeys]?: ITexture };
export type IPhysicalMaterialTextureUploaded = { [key in IPhysicalMaterialPackKeys]?: ITexture };
export type IToonMaterialTextureUploaded = { [key in IToonMaterialPackKeys]?: ITexture };
export type IStandardMaterialTextureUploaded = { [key in IStandardMaterialPackKeys]?: ITexture };

export type IMaterialTextureUploaded =
  | IBasicMaterialTextureUploaded
  | IDepthMaterialTextureUploaded
  | IDistanceMaterialTextureUploaded
  | INormalMaterialTextureUploaded
  | IMatcapMaterialTextureUploaded
  | ILamberMaterialTextureUploaded
  | IPhongMaterialTextureUploaded
  | IPhysicalMaterialTextureUploaded
  | IToonMaterialTextureUploaded
  | IStandardMaterialTextureUploaded;
