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
} from './IMaterialPackKeys';
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
import type { IWithBasicMaterialProperty } from './IWithMaterialProperty';

export type IGetAllTextures<T> = Readonly<{ all: () => Promise<T> }>;

export type IBasicMaterialTextureUploadPromises = Readonly<{ [key in IBasicMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<IBasicMaterialTextureUploaded>>;
export type IDepthMaterialTextureUploadPromises = Readonly<{ [key in IDepthMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<IDepthMaterialTextureUploaded>>;
export type IDistanceMaterialTextureUploadPromises = Readonly<
  { [key in IDistanceMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<IDistanceMaterialTextureUploaded>
>;
export type INormalMaterialTextureUploadPromises = Readonly<{ [key in INormalMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<INormalMaterialTextureUploaded>>;
export type IMatcapMaterialTextureUploadPromises = Readonly<{ [key in IMatcapMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<IMatcapMaterialTextureUploaded>>;
export type ILambertMaterialTextureUploadPromises = Readonly<{ [key in ILambertMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<ILambertMaterialTextureUploaded>>;
export type IPhongMaterialTextureUploadPromises = Readonly<{ [key in IPhongMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<IPhongMaterialTextureUploaded>>;
export type IPhysicalMaterialTextureUploadPromises = Readonly<
  { [key in IPhysicalMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<IPhysicalMaterialTextureUploaded>
>;
export type IToonMaterialTextureUploadPromises = Readonly<{ [key in IToonMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<IToonMaterialTextureUploaded>>;
export type IStandardMaterialTextureUploadPromises = Readonly<
  { [key in IStandardMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<IStandardMaterialTextureUploaded>
>;

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
