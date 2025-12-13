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

export type TBasicMaterialTexturePack = Readonly<{ [key in TBasicMaterialPackKeys]?: TTexturePackParams }>;
export type TDepthMaterialTexturePack = Readonly<{ [key in TDepthMaterialPackKeys]?: TTexturePackParams }>;
export type TDistanceMaterialTexturePack = Readonly<{ [key in TDistanceMaterialPackKeys]?: TTexturePackParams }>;
export type TNormalMaterialTexturePack = Readonly<{ [key in TNormalMaterialPackKeys]?: TTexturePackParams }>;
export type TMatcapMaterialTexturePack = Readonly<{ [key in TMatcapMaterialPackKeys]?: TTexturePackParams }>;
export type TLambertMaterialTexturePack = Readonly<{ [key in TLambertMaterialPackKeys]?: TTexturePackParams }>;
export type TPhongMaterialTexturePack = Readonly<{ [key in TPhongMaterialPackKeys]?: TTexturePackParams }>;
export type TPhysicalMaterialTexturePack = Readonly<{ [key in TPhysicalMaterialPackKeys]?: TTexturePackParams }>;
export type TToonMaterialTexturePack = Readonly<{ [key in TToonMaterialPackKeys]?: TTexturePackParams }>;
export type TStandardMaterialTexturePack = Readonly<{ [key in TStandardMaterialPackKeys]?: TTexturePackParams }>;
export type IPointsMaterialTexturePack = Readonly<{ [key in TPointsMaterialPackKeys]?: TTexturePackParams }>;

export type TMaterialTexturePack =
  | TBasicMaterialTexturePack
  | TDepthMaterialTexturePack
  | TDistanceMaterialTexturePack
  | TNormalMaterialTexturePack
  | TMatcapMaterialTexturePack
  | TLambertMaterialTexturePack
  | TPhongMaterialTexturePack
  | TPhysicalMaterialTexturePack
  | TToonMaterialTexturePack
  | TStandardMaterialTexturePack
  | IPointsMaterialTexturePack;
