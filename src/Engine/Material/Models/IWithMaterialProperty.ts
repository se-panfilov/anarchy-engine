import type { IMaterialProps } from './IMaterialProps';

export type IWithBasicMaterialProperty = Readonly<{ material: IMaterialProps }>; //MaterialType.Basic
export type IWithDepthMaterialProperty = Readonly<{ material: IMaterialProps }>; //MaterialType.Depth
export type IWithDistanceMaterialProperty = Readonly<{ material: IMaterialProps }>; //MaterialType.Distance
export type IWithNormalMaterialProperty = Readonly<{ material: IMaterialProps }>; //MaterialType.Normal
export type IWithMatcapMaterialProperty = Readonly<{ material: IMaterialProps }>; //MaterialType.Matcap
export type IWithLambertMaterialProperty = Readonly<{ material: IMaterialProps }>; //MaterialType.Lambert
export type IWithPhongMaterialProperty = Readonly<{ material: IMaterialProps }>; //MaterialType.Phong
export type IWithPhysicalMaterialProperty = Readonly<{ material: IMaterialProps }>; //MaterialType.Physical
export type IWithToonMaterialProperty = Readonly<{ material: IMaterialProps }>; //MaterialType.Toon
export type IWithStandardMaterialProperty = Readonly<{ material: IMaterialProps }>; //MaterialType.Standard

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
