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
} from '@/Engine/MaterialTexturePack';

import type { ITexture } from './ITexture';
import type {
  IBasicTextureUploaded,
  IDepthTextureUploaded,
  IDistanceTextureUploaded,
  ILambertTextureUploaded,
  IMatcapTextureUploaded,
  INormalTextureUploaded,
  IPhongTextureUploaded,
  IPhysicalTextureUploaded,
  IStandardTextureUploaded,
  IToonTextureUploaded
} from './ITextureUploaded';

export type IGetAllTextures<T> = Readonly<{ all: () => Promise<T> }>;

export type IBasicTextureUploadPromises = Readonly<{ [key in IBasicMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IBasicTextureUploaded>>;
export type IDepthTextureUploadPromises = Readonly<{ [key in IDepthMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IDepthTextureUploaded>>;
export type IDistanceTextureUploadPromises = Readonly<{ [key in IDistanceMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IDistanceTextureUploaded>>;
export type INormalTextureUploadPromises = Readonly<{ [key in INormalMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<INormalTextureUploaded>>;
export type IMatcapTextureUploadPromises = Readonly<{ [key in IMatcapMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IMatcapTextureUploaded>>;
export type ILambertTextureUploadPromises = Readonly<{ [key in ILambertMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<ILambertTextureUploaded>>;
export type IPhongTextureUploadPromises = Readonly<{ [key in IPhongMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IPhongTextureUploaded>>;
export type IPhysicalTextureUploadPromises = Readonly<{ [key in IPhysicalMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IPhysicalTextureUploaded>>;
export type IToonTextureUploadPromises = Readonly<{ [key in IToonMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IToonTextureUploaded>>;
export type IStandardTextureUploadPromises = Readonly<{ [key in IStandardMaterialPackKeys]?: Promise<ITexture> } & IGetAllTextures<IStandardTextureUploaded>>;

export type ITextureUploadPromises =
  | IBasicTextureUploadPromises
  | IDepthTextureUploadPromises
  | IDistanceTextureUploadPromises
  | INormalTextureUploadPromises
  | IMatcapTextureUploadPromises
  | ILambertTextureUploadPromises
  | IPhongTextureUploadPromises
  | IPhysicalTextureUploadPromises
  | IToonTextureUploadPromises
  | IStandardTextureUploadPromises;
