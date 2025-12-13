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

import type {
  IBasicMaterialTextureUploaded,
  IDepthMaterialTextureUploaded,
  IDistanceMaterialTextureUploaded,
  ILambertMaterialTextureUploaded,
  IMatcapMaterialTextureUploaded,
  INormalMaterialTextureUploaded,
  IPhongMaterialTextureUploaded,
  IPhysicalMaterialTextureUploaded,
  IStandardMaterialTextureUploaded,
  IToonMaterialTextureUploaded
} from './IMaterialTextureUploaded';
import type { ITexture } from './ITexture';

export type IGetAllTextures<T> = Readonly<{ all: () => Promise<T> }>;

export type IBasicMaterialTextureUploadPromises = Readonly<{ [key in IBasicMaterialPackKeys]?: Promise<ITexture> } & IWitMaterialProperty & IGetAllTextures<IBasicMaterialTextureUploaded>>;
export type IDepthMaterialTextureUploadPromises = Readonly<{ [key in IDepthMaterialPackKeys]?: Promise<ITexture> } & IWitMaterialProperty & IGetAllTextures<IDepthMaterialTextureUploaded>>;
export type IDistanceMaterialTextureUploadPromises = Readonly<{ [key in IDistanceMaterialPackKeys]?: Promise<ITexture> } & IWitMaterialProperty & IGetAllTextures<IDistanceMaterialTextureUploaded>>;
export type INormalMaterialTextureUploadPromises = Readonly<{ [key in INormalMaterialPackKeys]?: Promise<ITexture> } & IWitMaterialProperty & IGetAllTextures<INormalMaterialTextureUploaded>>;
export type IMatcapMaterialTextureUploadPromises = Readonly<{ [key in IMatcapMaterialPackKeys]?: Promise<ITexture> } & IWitMaterialProperty & IGetAllTextures<IMatcapMaterialTextureUploaded>>;
export type ILambertMaterialTextureUploadPromises = Readonly<{ [key in ILambertMaterialPackKeys]?: Promise<ITexture> } & IWitMaterialProperty & IGetAllTextures<ILambertMaterialTextureUploaded>>;
export type IPhongMaterialTextureUploadPromises = Readonly<{ [key in IPhongMaterialPackKeys]?: Promise<ITexture> } & IWitMaterialProperty & IGetAllTextures<IPhongMaterialTextureUploaded>>;
export type IPhysicalMaterialTextureUploadPromises = Readonly<{ [key in IPhysicalMaterialPackKeys]?: Promise<ITexture> } & IWitMaterialProperty & IGetAllTextures<IPhysicalMaterialTextureUploaded>>;
export type IToonMaterialTextureUploadPromises = Readonly<{ [key in IToonMaterialPackKeys]?: Promise<ITexture> } & IWitMaterialProperty & IGetAllTextures<IToonMaterialTextureUploaded>>;
export type IStandardMaterialTextureUploadPromises = Readonly<{ [key in IStandardMaterialPackKeys]?: Promise<ITexture> } & IWitMaterialProperty & IGetAllTextures<IStandardMaterialTextureUploaded>>;

export type IMaterialTextureUploadPromises =
  | IBasicMaterialTextureUploadPromises
  | IDepthMaterialTextureUploadPromises
  | IDistanceMaterialTextureUploadPromises
  | INormalMaterialTextureUploadPromises
  | IMatcapMaterialTextureUploadPromises
  | ILambertMaterialTextureUploadPromises
  | IPhongMaterialTextureUploadPromises
  | IPhysicalMaterialTextureUploadPromises
  | IToonMaterialTextureUploadPromises
  | IStandardMaterialTextureUploadPromises;
