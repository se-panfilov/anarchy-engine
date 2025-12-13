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

import type { ITexturePackParams } from './ITexturePackParams';

export type IBasicMaterialTexturePack = Readonly<{ [key in IBasicMaterialPackKeys]?: ITexturePackParams } & IWitMaterialProperty>;
export type IDepthMaterialTexturePack = Readonly<{ [key in IDepthMaterialPackKeys]?: ITexturePackParams } & IWitMaterialProperty>;
export type IDistanceMaterialTexturePack = Readonly<{ [key in IDistanceMaterialPackKeys]?: ITexturePackParams } & IWitMaterialProperty>;
export type INormalMaterialTexturePack = Readonly<{ [key in INormalMaterialPackKeys]?: ITexturePackParams } & IWitMaterialProperty>;
export type IMatcapMaterialTexturePack = Readonly<{ [key in IMatcapMaterialPackKeys]?: ITexturePackParams } & IWitMaterialProperty>;
export type ILambertMaterialTexturePack = Readonly<{ [key in ILambertMaterialPackKeys]?: ITexturePackParams } & IWitMaterialProperty>;
export type IPhongMaterialTexturePack = Readonly<{ [key in IPhongMaterialPackKeys]?: ITexturePackParams } & IWitMaterialProperty>;
export type IPhysicalMaterialTexturePack = Readonly<{ [key in IPhysicalMaterialPackKeys]?: ITexturePackParams } & IWitMaterialProperty>;
export type IToonMaterialTexturePack = Readonly<{ [key in IToonMaterialPackKeys]?: ITexturePackParams } & IWitMaterialProperty>;
export type IStandardMaterialTexturePack = Readonly<{ [key in IStandardMaterialPackKeys]?: ITexturePackParams } & IWitMaterialProperty>;

export type IMaterialTexturePack =
  | IBasicMaterialTexturePack
  | IDepthMaterialTexturePack
  | IDistanceMaterialTexturePack
  | INormalMaterialTexturePack
  | IMatcapMaterialTexturePack
  | ILambertMaterialTexturePack
  | IPhongMaterialTexturePack
  | IPhysicalMaterialTexturePack
  | IToonMaterialTexturePack
  | IStandardMaterialTexturePack;
