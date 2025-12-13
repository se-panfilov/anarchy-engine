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

export type TAbstractMaterialParams = TAbstractMaterialProps & TWithMaterialType;
export type TBasicMaterialParams = TBasicMaterialProps & TWithMaterialType;
export type TDepthMaterialParams = TDepthMaterialProps & TWithMaterialType;
export type TDistanceMaterialParams = TDistanceMaterialProps & TWithMaterialType;
export type TNormalMaterialParams = TNormalMaterialProps & TWithMaterialType;
export type TMatcapMaterialParams = TMatcapMaterialProps & TWithMaterialType;
export type TLambertMaterialParams = TLambertMaterialProps & TWithMaterialType;
export type TPhongMaterialParams = TPhongMaterialProps & TWithMaterialType;
export type TToonMaterialParams = TToonMaterialProps & TWithMaterialType;
export type TStandardMaterialParams = TStandardMaterialProps & TWithMaterialType;
export type TPhysicalMaterialParams = TPhysicalMaterialProps & TWithMaterialType;
export type TPointsMaterialParams = TPointsMaterialProps & TWithMaterialType;

export type TMaterialParams =
  | TAbstractMaterialParams
  | TBasicMaterialParams
  | TDepthMaterialParams
  | TDistanceMaterialParams
  | TNormalMaterialParams
  | TMatcapMaterialParams
  | TLambertMaterialParams
  | TPhongMaterialParams
  | TToonMaterialParams
  | TStandardMaterialParams
  | TPhysicalMaterialParams
  | TPointsMaterialParams;
