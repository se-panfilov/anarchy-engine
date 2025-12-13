import type {
  TAbstractMaterialProps,
  TBasicMaterialProps,
  TDepthMaterialProps,
  TDistanceMaterialProps,
  TLambertMaterialProps,
  TMatcapMaterialProps,
  TNormalMaterialProps,
  TPhongMaterialProps,
  TPhysicalMaterialProps,
  TPointsMaterialProps,
  TStandardMaterialProps,
  TToonMaterialProps
} from './TMaterialProps';
import type { TWithMaterialType } from './TWithMaterialType';

export type IAbstractMaterialParams = TAbstractMaterialProps & TWithMaterialType;
export type IBasicMaterialParams = TBasicMaterialProps & TWithMaterialType;
export type IDepthMaterialParams = TDepthMaterialProps & TWithMaterialType;
export type IDistanceMaterialParams = TDistanceMaterialProps & TWithMaterialType;
export type INormalMaterialParams = TNormalMaterialProps & TWithMaterialType;
export type IMatcapMaterialParams = TMatcapMaterialProps & TWithMaterialType;
export type ILambertMaterialParams = TLambertMaterialProps & TWithMaterialType;
export type IPhongMaterialParams = TPhongMaterialProps & TWithMaterialType;
export type IToonMaterialParams = TToonMaterialProps & TWithMaterialType;
export type IStandardMaterialParams = TStandardMaterialProps & TWithMaterialType;
export type IPhysicalMaterialParams = TPhysicalMaterialProps & TWithMaterialType;
export type IPointsMaterialParams = TPointsMaterialProps & TWithMaterialType;

export type TMaterialParams =
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
