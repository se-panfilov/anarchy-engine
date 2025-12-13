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
import type { TTexture } from './TTexture';

export type IGetAllTextures<T> = Readonly<{ all: () => Promise<T> }>;

export type IBasicTextureUploadPromises = Readonly<{ [key in IBasicMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IBasicTextureUploaded>>;
export type IDepthTextureUploadPromises = Readonly<{ [key in IDepthMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IDepthTextureUploaded>>;
export type IDistanceTextureUploadPromises = Readonly<{ [key in IDistanceMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IDistanceTextureUploaded>>;
export type INormalTextureUploadPromises = Readonly<{ [key in INormalMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<INormalTextureUploaded>>;
export type IMatcapTextureUploadPromises = Readonly<{ [key in IMatcapMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IMatcapTextureUploaded>>;
export type ILambertTextureUploadPromises = Readonly<{ [key in ILambertMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<ILambertTextureUploaded>>;
export type IPhongTextureUploadPromises = Readonly<{ [key in IPhongMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IPhongTextureUploaded>>;
export type IPhysicalTextureUploadPromises = Readonly<{ [key in IPhysicalMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IPhysicalTextureUploaded>>;
export type IToonTextureUploadPromises = Readonly<{ [key in IToonMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IToonTextureUploaded>>;
export type IStandardTextureUploadPromises = Readonly<{ [key in IStandardMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IStandardTextureUploaded>>;

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
