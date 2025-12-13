import type { MaterialType } from '@/Engine/Material';

export type IWithBasicMaterialProperty = Readonly<{ material: MaterialType }>; // Readonly<{ material: MaterialType.Basic }>;
export type IWithDepthMaterialProperty = Readonly<{ material: MaterialType }>; // Readonly<{ material: MaterialType.Depth }>;
export type IWithDistanceMaterialProperty = Readonly<{ material: MaterialType }>; // Readonly<{ material: MaterialType.Distance }>;
export type IWithNormalMaterialProperty = Readonly<{ material: MaterialType }>; // Readonly<{ material: MaterialType.Normal }>;
export type IWithMatcapMaterialProperty = Readonly<{ material: MaterialType }>; // Readonly<{ material: MaterialType.Matcap }>;
export type IWithLambertMaterialProperty = Readonly<{ material: MaterialType }>; // Readonly<{ material: MaterialType.Lambert }>;
export type IWithPhongMaterialProperty = Readonly<{ material: MaterialType }>; // Readonly<{ material: MaterialType.Phong }>;
export type IWithPhysicalMaterialProperty = Readonly<{ material: MaterialType }>; // Readonly<{ material: MaterialType.Physical }>;
export type IWithToonMaterialProperty = Readonly<{ material: MaterialType }>; // Readonly<{ material: MaterialType.Toon }>;
export type IWithStandardMaterialProperty = Readonly<{ material: MaterialType }>; // Readonly<{ material: MaterialType.Standard }>;

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
