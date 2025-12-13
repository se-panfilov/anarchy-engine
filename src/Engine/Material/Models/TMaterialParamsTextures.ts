import type { TTexture } from '@/Engine/Texture';

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

export type TBasicMaterialParamsTextures = Readonly<{ [key in TBasicMaterialTextureKeys]?: TTexture }>;
export type TDepthMaterialParamsTextures = Readonly<{ [key in TDepthMaterialTextureKeys]?: TTexture }>;
export type TDistanceMaterialParamsTextures = Readonly<{ [key in TDistanceMaterialTextureKeys]?: TTexture }>;
export type TNormalMaterialParamsTextures = Readonly<{ [key in TNormalMaterialTextureKeys]?: TTexture }>;
export type TMatcapMaterialParamsTextures = Readonly<{ [key in TMatcapMaterialTextureKeys]?: TTexture }>;
export type TLambertMaterialParamsTextures = Readonly<{ [key in TLambertMaterialTextureKeys]?: TTexture }>;
export type TPhongMaterialParamsTextures = Readonly<{ [key in TPhongMaterialTextureKeys]?: TTexture }>;
export type TPhysicalMaterialParamsTextures = Readonly<{ [key in TPhysicalMaterialTextureKeys]?: TTexture }>;
export type TToonMaterialParamsTextures = Readonly<{ [key in TToonMaterialTextureKeys]?: TTexture }>;
export type TStandardMaterialParamsTextures = Readonly<{ [key in TStandardMaterialTextureKeys]?: TTexture }>;
export type TPointsMaterialParamsTextures = Readonly<{ [key in TPointsMaterialTextureKeys]?: TTexture }>;

export type TMaterialParamsTextures =
  | TBasicMaterialParamsTextures
  | TDepthMaterialParamsTextures
  | TDistanceMaterialParamsTextures
  | TNormalMaterialParamsTextures
  | TMatcapMaterialParamsTextures
  | TLambertMaterialParamsTextures
  | TPhongMaterialParamsTextures
  | TPhysicalMaterialParamsTextures
  | TToonMaterialParamsTextures
  | TStandardMaterialParamsTextures
  | TPointsMaterialParamsTextures;
