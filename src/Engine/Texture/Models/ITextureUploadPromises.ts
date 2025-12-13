import type {
  TBasicMaterialPackKeys,
  TDepthMaterialPackKeys,
  TDistanceMaterialPackKeys,
  TLambertMaterialPackKeys,
  TMatcapMaterialPackKeys,
  TNormalMaterialPackKeys,
  TPhongMaterialPackKeys,
  TPhysicalMaterialPackKeys,
  TStandardMaterialPackKeys,
  TToonMaterialPackKeys
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

export type IBasicTextureUploadPromises = Readonly<{ [key in TBasicMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IBasicTextureUploaded>>;
export type IDepthTextureUploadPromises = Readonly<{ [key in TDepthMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IDepthTextureUploaded>>;
export type IDistanceTextureUploadPromises = Readonly<{ [key in TDistanceMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IDistanceTextureUploaded>>;
export type INormalTextureUploadPromises = Readonly<{ [key in TNormalMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<INormalTextureUploaded>>;
export type IMatcapTextureUploadPromises = Readonly<{ [key in TMatcapMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IMatcapTextureUploaded>>;
export type ILambertTextureUploadPromises = Readonly<{ [key in TLambertMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<ILambertTextureUploaded>>;
export type IPhongTextureUploadPromises = Readonly<{ [key in TPhongMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IPhongTextureUploaded>>;
export type IPhysicalTextureUploadPromises = Readonly<{ [key in TPhysicalMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IPhysicalTextureUploaded>>;
export type IToonTextureUploadPromises = Readonly<{ [key in TToonMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IToonTextureUploaded>>;
export type IStandardTextureUploadPromises = Readonly<{ [key in TStandardMaterialPackKeys]?: Promise<TTexture> } & IGetAllTextures<IStandardTextureUploaded>>;

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
