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

export type TBasicMaterialTexturePack = Readonly<{ [key in TBasicMaterialPackKeys]?: string }>;
export type TDepthMaterialTexturePack = Readonly<{ [key in TDepthMaterialPackKeys]?: string }>;
export type TDistanceMaterialTexturePack = Readonly<{ [key in TDistanceMaterialPackKeys]?: string }>;
export type TNormalMaterialTexturePack = Readonly<{ [key in TNormalMaterialPackKeys]?: string }>;
export type TMatcapMaterialTexturePack = Readonly<{ [key in TMatcapMaterialPackKeys]?: string }>;
export type TLambertMaterialTexturePack = Readonly<{ [key in TLambertMaterialPackKeys]?: string }>;
export type TPhongMaterialTexturePack = Readonly<{ [key in TPhongMaterialPackKeys]?: string }>;
export type TPhysicalMaterialTexturePack = Readonly<{ [key in TPhysicalMaterialPackKeys]?: string }>;
export type TToonMaterialTexturePack = Readonly<{ [key in TToonMaterialPackKeys]?: string }>;
export type TStandardMaterialTexturePack = Readonly<{ [key in TStandardMaterialPackKeys]?: string }>;
export type TPointsMaterialTexturePack = Readonly<{ [key in TPointsMaterialPackKeys]?: string }>;

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
  | TPointsMaterialTexturePack;
