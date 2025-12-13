import type {
  TBasicMaterialTextureKeys,
  TDepthMaterialTextureKeys,
  TDistanceMaterialTextureKeys,
  TLambertMaterialTextureKeys,
  TMatcapMaterialTextureKeys,
  TNormalMaterialTextureKeys,
  TPhongMaterialTextureKeys,
  TPhysicalMaterialTextureKeys,
  TPointsMaterialTextureKeys,
  TStandardMaterialTextureKeys,
  TToonMaterialTextureKeys
} from './TMaterialTextureKeys';

export type TBasicMaterialConfigTextures = Readonly<{ [key in TBasicMaterialTextureKeys]?: string }>;
export type TDepthMaterialConfigTextures = Readonly<{ [key in TDepthMaterialTextureKeys]?: string }>;
export type TDistanceMaterialConfigTextures = Readonly<{ [key in TDistanceMaterialTextureKeys]?: string }>;
export type TNormalMaterialConfigTextures = Readonly<{ [key in TNormalMaterialTextureKeys]?: string }>;
export type TMatcapMaterialConfigTextures = Readonly<{ [key in TMatcapMaterialTextureKeys]?: string }>;
export type TLambertMaterialConfigTextures = Readonly<{ [key in TLambertMaterialTextureKeys]?: string }>;
export type TPhongMaterialConfigTextures = Readonly<{ [key in TPhongMaterialTextureKeys]?: string }>;
export type TPhysicalMaterialConfigTextures = Readonly<{ [key in TPhysicalMaterialTextureKeys]?: string }>;
export type TToonMaterialConfigTextures = Readonly<{ [key in TToonMaterialTextureKeys]?: string }>;
export type TStandardMaterialConfigTextures = Readonly<{ [key in TStandardMaterialTextureKeys]?: string }>;
export type TPointsMaterialConfigTextures = Readonly<{ [key in TPointsMaterialTextureKeys]?: string }>;

export type TMaterialConfigTextures =
  | TBasicMaterialConfigTextures
  | TDepthMaterialConfigTextures
  | TDistanceMaterialConfigTextures
  | TNormalMaterialConfigTextures
  | TMatcapMaterialConfigTextures
  | TLambertMaterialConfigTextures
  | TPhongMaterialConfigTextures
  | TPhysicalMaterialConfigTextures
  | TToonMaterialConfigTextures
  | TStandardMaterialConfigTextures
  | TPointsMaterialConfigTextures;
