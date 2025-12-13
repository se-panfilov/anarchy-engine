import type {
  IAbstractMaterialProps,
  IBasicMaterialProps,
  IDepthMaterialProps,
  IDistanceMaterialProps,
  ILambertMaterialProps,
  IMatcapMaterialProps,
  INormalMaterialProps,
  IPhongMaterialProps,
  IPhysicalMaterialProps,
  IPointsMaterialProps,
  IStandardMaterialProps,
  IToonMaterialProps
} from './IMaterialProps';
import type { IWithMaterialType } from './IWithMaterialType';

export type IAbstractMaterialParams = IAbstractMaterialProps & IWithMaterialType;
export type IBasicMaterialParams = IBasicMaterialProps & IWithMaterialType;
export type IDepthMaterialParams = IDepthMaterialProps & IWithMaterialType;
export type IDistanceMaterialParams = IDistanceMaterialProps & IWithMaterialType;
export type INormalMaterialParams = INormalMaterialProps & IWithMaterialType;
export type IMatcapMaterialParams = IMatcapMaterialProps & IWithMaterialType;
export type ILambertMaterialParams = ILambertMaterialProps & IWithMaterialType;
export type IPhongMaterialParams = IPhongMaterialProps & IWithMaterialType;
export type IToonMaterialParams = IToonMaterialProps & IWithMaterialType;
export type IStandardMaterialParams = IStandardMaterialProps & IWithMaterialType;
export type IPhysicalMaterialParams = IPhysicalMaterialProps & IWithMaterialType;
export type IPointsMaterialParams = IPointsMaterialProps & IWithMaterialType;

export type IMaterialParams =
  | IAbstractMaterialParams
  | IBasicMaterialParams
  | IDepthMaterialParams
  | IDistanceMaterialParams
  | INormalMaterialParams
  | IMatcapMaterialParams
  | ILambertMaterialParams
  | IPhongMaterialParams
  | IToonMaterialParams
  | IStandardMaterialParams
  | IPhysicalMaterialParams
  | IPointsMaterialParams;
