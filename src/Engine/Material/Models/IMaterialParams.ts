import type { IWithReadonlyTags } from '@/Engine/Mixins';

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

export type IAbstractMaterialParams = IAbstractMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type IBasicMaterialParams = IBasicMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type IDepthMaterialParams = IDepthMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type IDistanceMaterialParams = IDistanceMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type INormalMaterialParams = INormalMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type IMatcapMaterialParams = IMatcapMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type ILambertMaterialParams = ILambertMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type IPhongMaterialParams = IPhongMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type IToonMaterialParams = IToonMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type IStandardMaterialParams = IStandardMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type IPhysicalMaterialParams = IPhysicalMaterialProps & IWithMaterialType & IWithReadonlyTags;
export type IPointsMaterialParams = IPointsMaterialProps & IWithMaterialType & IWithReadonlyTags;

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
