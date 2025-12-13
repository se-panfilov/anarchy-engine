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
} from './IMaterialPackKeys';
import type {
  IBasicMaterialTextureUploaded,
  IDepthMaterialTextureUploaded,
  IDistanceMaterialTextureUploaded,
  ILamberMaterialTextureUploaded,
  IMatcapMaterialTextureUploaded,
  INormalMaterialTextureUploaded,
  IPhongMaterialTextureUploaded,
  IPhysicalMaterialTextureUploaded,
  IStandardMaterialTextureUploaded,
  IToonMaterialTextureUploaded
} from './IMaterialTextureUploaded';
import type { ITexture } from './ITexture';

export type IGetAllTextures<T> = Readonly<{ all: () => Promise<T> }>;

export type IBasicMaterialTextureUploadPromises = Readonly<{ [key in IBasicMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IBasicMaterialTextureUploaded>>;
export type IDepthMaterialTextureUploadPromises = Readonly<{ [key in IDepthMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IDepthMaterialTextureUploaded>>;
export type IDistanceMaterialTextureUploadPromises = Readonly<{ [key in IDistanceMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IDistanceMaterialTextureUploaded>>;
export type INormalMaterialTextureUploadPromises = Readonly<{ [key in INormalMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<INormalMaterialTextureUploaded>>;
export type IMatcapMaterialTextureUploadPromises = Readonly<{ [key in IMatcapMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IMatcapMaterialTextureUploaded>>;
export type ILamberMaterialTextureUploadPromises = Readonly<{ [key in ILamberMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<ILamberMaterialTextureUploaded>>;
export type IPhongMaterialTextureUploadPromises = Readonly<{ [key in IPhongMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IPhongMaterialTextureUploaded>>;
export type IPhysicalMaterialTextureUploadPromises = Readonly<{ [key in IPhysicalMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IPhysicalMaterialTextureUploaded>>;
export type IToonMaterialTextureUploadPromises = Readonly<{ [key in IToonMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IToonMaterialTextureUploaded>>;
export type IStandardMaterialTextureUploadPromises = Readonly<{ [key in IStandardMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IStandardMaterialTextureUploaded>>;

export type IMaterialTextureUploadPromises =
  | IBasicMaterialTextureUploadPromises
  | IDepthMaterialTextureUploadPromises
  | IDistanceMaterialTextureUploadPromises
  | INormalMaterialTextureUploadPromises
  | IMatcapMaterialTextureUploadPromises
  | ILamberMaterialTextureUploadPromises
  | IPhongMaterialTextureUploadPromises
  | IPhysicalMaterialTextureUploadPromises
  | IToonMaterialTextureUploadPromises
  | IStandardMaterialTextureUploadPromises;
