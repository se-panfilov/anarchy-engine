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

export type IBasicMaterialTexturePack = Readonly<{ [key in IBasicMaterialPackKeys]?: ITexturePackParams }> & Readonly<{ material: MaterialType.Basic }>;
export type IDepthMaterialTexturePack = Readonly<{ [key in IDepthMaterialPackKeys]?: ITexturePackParams }> & Readonly<{ material: MaterialType.Depth }>;
export type IDistanceMaterialTexturePack = Readonly<{ [key in IDistanceMaterialPackKeys]?: ITexturePackParams }> & Readonly<{ material: MaterialType.Distance }>;
export type INormalMaterialTexturePack = Readonly<{ [key in INormalMaterialPackKeys]?: ITexturePackParams }> & Readonly<{ material: MaterialType.Normal }>;
export type IMatcapMaterialTexturePack = Readonly<{ [key in IMatcapMaterialPackKeys]?: ITexturePackParams }> & Readonly<{ material: MaterialType.Matcap }>;
export type ILamberMaterialTexturePack = Readonly<{ [key in ILamberMaterialPackKeys]?: ITexturePackParams }> & Readonly<{ material: MaterialType.Lamber }>;
export type IPhongMaterialTexturePack = Readonly<{ [key in IPhongMaterialPackKeys]?: ITexturePackParams }> & Readonly<{ material: MaterialType.Phong }>;
export type IPhysicalMaterialTexturePack = Readonly<{ [key in IPhysicalMaterialPackKeys]?: ITexturePackParams }> & Readonly<{ material: MaterialType.Physical }>;
export type IToonMaterialTexturePack = Readonly<{ [key in IToonMaterialPackKeys]?: ITexturePackParams }> & Readonly<{ material: MaterialType.Toon }>;
export type IStandardMaterialTexturePack = Readonly<{ [key in IStandardMaterialPackKeys]?: ITexturePackParams }> & Readonly<{ material: MaterialType.Standard }>;

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
