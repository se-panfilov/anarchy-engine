import type { MaterialType } from '@/Engine/Domains/Material';

import type {
  IBasicMaterialPackKeys,
  IDepthMaterialPackKeys,
  IDistanceMaterialPackKeys,
  ILamberMaterialPackKeys,
  IMatcapMaterialPackKeys,
  INormalMaterialPackKeys,
  IPhongMaterialPackKeys,
  IPhysicalMaterialPackKeys,
  IStandardMaterialPackKeys,
  IToonMaterialPackKeys
} from './IMaterialPackKeys';
import type { ITexturePackParams } from './ITexturePackParams';

export type IBasicMaterialTexturePack = Readonly<{ [key in IBasicMaterialPackKeys]?: ITexturePackParams } & { material: MaterialType.Basic }>;
export type IDepthMaterialTexturePack = Readonly<{ [key in IDepthMaterialPackKeys]?: ITexturePackParams } & { material: MaterialType.Depth }>;
export type IDistanceMaterialTexturePack = Readonly<{ [key in IDistanceMaterialPackKeys]?: ITexturePackParams } & { material: MaterialType.Distance }>;
export type INormalMaterialTexturePack = Readonly<{ [key in INormalMaterialPackKeys]?: ITexturePackParams } & { material: MaterialType.Normal }>;
export type IMatcapMaterialTexturePack = Readonly<{ [key in IMatcapMaterialPackKeys]?: ITexturePackParams } & { material: MaterialType.Matcap }>;
export type ILamberMaterialTexturePack = Readonly<{ [key in ILamberMaterialPackKeys]?: ITexturePackParams } & { material: MaterialType.Lamber }>;
export type IPhongMaterialTexturePack = Readonly<{ [key in IPhongMaterialPackKeys]?: ITexturePackParams } & { material: MaterialType.Phong }>;
export type IPhysicalMaterialTexturePack = Readonly<{ [key in IPhysicalMaterialPackKeys]?: ITexturePackParams } & { material: MaterialType.Physical }>;
export type IToonMaterialTexturePack = Readonly<{ [key in IToonMaterialPackKeys]?: ITexturePackParams } & { material: MaterialType.Toon }>;
export type IStandardMaterialTexturePack = Readonly<{ [key in IStandardMaterialPackKeys]?: ITexturePackParams } & { material: MaterialType.Standard }>;

export type IMaterialTexturePack =
  | IBasicMaterialTexturePack
  | IDepthMaterialTexturePack
  | IDistanceMaterialTexturePack
  | INormalMaterialTexturePack
  | IMatcapMaterialTexturePack
  | ILamberMaterialTexturePack
  | IPhongMaterialTexturePack
  | IPhysicalMaterialTexturePack
  | IToonMaterialTexturePack
  | IStandardMaterialTexturePack;
