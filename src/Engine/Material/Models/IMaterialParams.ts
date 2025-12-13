import type {
  IAbstractMaterialProps,
  IBasicMaterialProps,
  IDepthMaterialProps,
  IDistanceMaterialProps,
  ILambertMaterialProps,
  IMatcapMaterialProps,
  IMaterialProps,
  INormalMaterialProps,
  IPhongMaterialProps,
  IPhysicalMaterialProps,
  IPointsMaterialProps,
  IStandardMaterialProps,
  IToonMaterialProps
} from './IMaterialProps';

//This seems to be useless, but done for the sake of consistency, and potentially params might have some additional fields, e.g. position
export type IAbstractMaterialParams = IAbstractMaterialProps;
export type IBasicMaterialParams = IBasicMaterialProps;
export type IDepthMaterialParams = IDepthMaterialProps;
export type IDistanceMaterialParams = IDistanceMaterialProps;
export type INormalMaterialParams = INormalMaterialProps;
export type IMatcapMaterialParams = IMatcapMaterialProps;
export type ILambertMaterialParams = ILambertMaterialProps;
export type IPhongMaterialParams = IPhongMaterialProps;
export type IToonMaterialParams = IToonMaterialProps;
export type IStandardMaterialParams = IStandardMaterialProps;
export type IPhysicalMaterialParams = IPhysicalMaterialProps;
export type IPointsMaterialParams = IPointsMaterialProps;
export type IMaterialParams = IMaterialProps;
