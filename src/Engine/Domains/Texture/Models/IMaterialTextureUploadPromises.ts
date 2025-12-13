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
import type {
  IWithBasicMaterialProperty,
  IWithDepthMaterialProperty,
  IWithDistanceMaterialProperty,
  IWithLambertMaterialProperty,
  IWithMatcapMaterialProperty,
  IWithNormalMaterialProperty,
  IWithPhongMaterialProperty,
  IWithPhysicalMaterialProperty,
  IWithStandardMaterialProperty,
  IWithToonMaterialProperty
} from '@/Engine/Domains/Material';

export type IGetAllTextures<T> = Readonly<{ all: () => Promise<T> }>;

export type IBasicMaterialTextureUploadPromises = Readonly<{ [key in IBasicMaterialPackKeys]?: Promise<ITexture> } & IWithBasicMaterialProperty & IGetAllTextures<IBasicMaterialTextureUploaded>>;
export type IDepthMaterialTextureUploadPromises = Readonly<{ [key in IDepthMaterialPackKeys]?: Promise<ITexture> } & IWithDepthMaterialProperty & IGetAllTextures<IDepthMaterialTextureUploaded>>;
export type IDistanceMaterialTextureUploadPromises = Readonly<
  { [key in IDistanceMaterialPackKeys]?: Promise<ITexture> } & IWithDistanceMaterialProperty & IGetAllTextures<IDistanceMaterialTextureUploaded>
>;
export type INormalMaterialTextureUploadPromises = Readonly<{ [key in INormalMaterialPackKeys]?: Promise<ITexture> } & IWithNormalMaterialProperty & IGetAllTextures<INormalMaterialTextureUploaded>>;
export type IMatcapMaterialTextureUploadPromises = Readonly<{ [key in IMatcapMaterialPackKeys]?: Promise<ITexture> } & IWithMatcapMaterialProperty & IGetAllTextures<IMatcapMaterialTextureUploaded>>;
export type ILambertMaterialTextureUploadPromises = Readonly<
  { [key in ILambertMaterialPackKeys]?: Promise<ITexture> } & IWithLambertMaterialProperty & IGetAllTextures<ILambertMaterialTextureUploaded>
>;
export type IPhongMaterialTextureUploadPromises = Readonly<{ [key in IPhongMaterialPackKeys]?: Promise<ITexture> } & IWithPhongMaterialProperty & IGetAllTextures<IPhongMaterialTextureUploaded>>;
export type IPhysicalMaterialTextureUploadPromises = Readonly<
  { [key in IPhysicalMaterialPackKeys]?: Promise<ITexture> } & IWithPhysicalMaterialProperty & IGetAllTextures<IPhysicalMaterialTextureUploaded>
>;
export type IToonMaterialTextureUploadPromises = Readonly<{ [key in IToonMaterialPackKeys]?: Promise<ITexture> } & IWithToonMaterialProperty & IGetAllTextures<IToonMaterialTextureUploaded>>;
export type IStandardMaterialTextureUploadPromises = Readonly<
  { [key in IStandardMaterialPackKeys]?: Promise<ITexture> } & IWithStandardMaterialProperty & IGetAllTextures<IStandardMaterialTextureUploaded>
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
