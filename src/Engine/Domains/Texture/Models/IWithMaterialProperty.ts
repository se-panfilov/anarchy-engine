import type { MaterialType } from '@/Engine/Domains/Material';

export type IWithBasicMaterialProperty = Readonly<{ material: MaterialType.Basic }>;
export type IWithDepthMaterialProperty = Readonly<{ material: MaterialType.Depth }>;
export type IWithDistanceMaterialProperty = Readonly<{ material: MaterialType.Distance }>;
export type IWithNormalMaterialProperty = Readonly<{ material: MaterialType.Normal }>;
export type IWithMatcapMaterialProperty = Readonly<{ material: MaterialType.Matcap }>;
export type IWithLambertMaterialProperty = Readonly<{ material: MaterialType.Lambert }>;
export type IWithPhongMaterialProperty = Readonly<{ material: MaterialType.Phong }>;
export type IWithPhysicalMaterialProperty = Readonly<{ material: MaterialType.Physical }>;
export type IWithToonMaterialProperty = Readonly<{ material: MaterialType.Toon }>;
export type IWithStandardMaterialProperty = Readonly<{ material: MaterialType.Standard }>;

export type IWitMaterialProperty =
  | IWithBasicMaterialProperty
  | IWithDepthMaterialProperty
  | IWithDistanceMaterialProperty
  | IWithNormalMaterialProperty
  | IWithMatcapMaterialProperty
  | IWithLambertMaterialProperty
  | IWithPhongMaterialProperty
  | IWithPhysicalMaterialProperty
  | IWithToonMaterialProperty
  | IWithStandardMaterialProperty;
