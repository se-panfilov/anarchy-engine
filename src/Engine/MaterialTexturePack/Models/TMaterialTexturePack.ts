import type {
  IBasicMaterialPackKeys,
  IDepthMaterialPackKeys,
  IDistanceMaterialPackKeys,
  ILambertMaterialPackKeys,
  IMatcapMaterialPackKeys,
  INormalMaterialPackKeys,
  IPhongMaterialPackKeys,
  IPhysicalMaterialPackKeys,
  IPointsMaterialPackKeys,
  IStandardMaterialPackKeys,
  IToonMaterialPackKeys
} from './IMaterialPackKeys';
import type { ITexturePackParams } from './ITexturePackParams';

export type IBasicMaterialTexturePack = Readonly<{ [key in IBasicMaterialPackKeys]?: ITexturePackParams }>;
export type IDepthMaterialTexturePack = Readonly<{ [key in IDepthMaterialPackKeys]?: ITexturePackParams }>;
export type IDistanceMaterialTexturePack = Readonly<{ [key in IDistanceMaterialPackKeys]?: ITexturePackParams }>;
export type INormalMaterialTexturePack = Readonly<{ [key in INormalMaterialPackKeys]?: ITexturePackParams }>;
export type IMatcapMaterialTexturePack = Readonly<{ [key in IMatcapMaterialPackKeys]?: ITexturePackParams }>;
export type ILambertMaterialTexturePack = Readonly<{ [key in ILambertMaterialPackKeys]?: ITexturePackParams }>;
export type IPhongMaterialTexturePack = Readonly<{ [key in IPhongMaterialPackKeys]?: ITexturePackParams }>;
export type IPhysicalMaterialTexturePack = Readonly<{ [key in IPhysicalMaterialPackKeys]?: ITexturePackParams }>;
export type IToonMaterialTexturePack = Readonly<{ [key in IToonMaterialPackKeys]?: ITexturePackParams }>;
export type IStandardMaterialTexturePack = Readonly<{ [key in IStandardMaterialPackKeys]?: ITexturePackParams }>;
export type IPointsMaterialTexturePack = Readonly<{ [key in IPointsMaterialPackKeys]?: ITexturePackParams }>;

export type TMaterialTexturePack =
  | IBasicMaterialTexturePack
  | IDepthMaterialTexturePack
  | IDistanceMaterialTexturePack
  | INormalMaterialTexturePack
  | IMatcapMaterialTexturePack
  | ILambertMaterialTexturePack
  | IPhongMaterialTexturePack
  | IPhysicalMaterialTexturePack
  | IToonMaterialTexturePack
  | IStandardMaterialTexturePack
  | IPointsMaterialTexturePack;
