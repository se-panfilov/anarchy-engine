import type {
  TBasicMaterialPackKeys,
  TDepthMaterialPackKeys,
  TDistanceMaterialPackKeys,
  TLambertMaterialPackKeys,
  TMatcapMaterialPackKeys,
  TNormalMaterialPackKeys,
  TPhongMaterialPackKeys,
  TPhysicalMaterialPackKeys,
  TPointsMaterialPackKeys,
  TStandardMaterialPackKeys,
  TToonMaterialPackKeys
} from './TMaterialPackKeys';
import type { TTexturePackParams } from './TTexturePackParams';

export type IBasicMaterialTexturePack = Readonly<{ [key in TBasicMaterialPackKeys]?: TTexturePackParams }>;
export type IDepthMaterialTexturePack = Readonly<{ [key in TDepthMaterialPackKeys]?: TTexturePackParams }>;
export type IDistanceMaterialTexturePack = Readonly<{ [key in TDistanceMaterialPackKeys]?: TTexturePackParams }>;
export type INormalMaterialTexturePack = Readonly<{ [key in TNormalMaterialPackKeys]?: TTexturePackParams }>;
export type IMatcapMaterialTexturePack = Readonly<{ [key in TMatcapMaterialPackKeys]?: TTexturePackParams }>;
export type ILambertMaterialTexturePack = Readonly<{ [key in TLambertMaterialPackKeys]?: TTexturePackParams }>;
export type IPhongMaterialTexturePack = Readonly<{ [key in TPhongMaterialPackKeys]?: TTexturePackParams }>;
export type IPhysicalMaterialTexturePack = Readonly<{ [key in TPhysicalMaterialPackKeys]?: TTexturePackParams }>;
export type IToonMaterialTexturePack = Readonly<{ [key in TToonMaterialPackKeys]?: TTexturePackParams }>;
export type IStandardMaterialTexturePack = Readonly<{ [key in TStandardMaterialPackKeys]?: TTexturePackParams }>;
export type IPointsMaterialTexturePack = Readonly<{ [key in TPointsMaterialPackKeys]?: TTexturePackParams }>;

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
