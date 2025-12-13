import type {
  TAbstractMaterialPropsOptions,
  TBasicMaterialPropsOptions,
  TDepthMaterialPropsOptions,
  TDistanceMaterialPropsOptions,
  TLambertMaterialPropsOptions,
  TMatcapMaterialPropsOptions,
  TNormalMaterialPropsOptions,
  TPhongMaterialPropsOptions,
  TPhysicalMaterialPropsOptions,
  TPointsMaterialPropsOptions,
  TStandardMaterialPropsOptions,
  TToonMaterialPropsOptions
} from './TMaterialPropsOptions';
import type { TWithMaterialType } from './TWithMaterialType';

export type TAbstractMaterialParamsOptions = TAbstractMaterialPropsOptions & TWithMaterialType;
export type TBasicMaterialParamsOptions = TBasicMaterialPropsOptions & TWithMaterialType;
export type TDepthMaterialParamsOptions = TDepthMaterialPropsOptions & TWithMaterialType;
export type TDistanceMaterialParamsOptions = TDistanceMaterialPropsOptions & TWithMaterialType;
export type TNormalMaterialParamsOptions = TNormalMaterialPropsOptions & TWithMaterialType;
export type TMatcapMaterialParamsOptions = TMatcapMaterialPropsOptions & TWithMaterialType;
export type TLambertMaterialParamsOptions = TLambertMaterialPropsOptions & TWithMaterialType;
export type TPhongMaterialParamsOptions = TPhongMaterialPropsOptions & TWithMaterialType;
export type TToonMaterialParamsOptions = TToonMaterialPropsOptions & TWithMaterialType;
export type TStandardMaterialParamsOptions = TStandardMaterialPropsOptions & TWithMaterialType;
export type TPhysicalMaterialParamsOptions = TPhysicalMaterialPropsOptions & TWithMaterialType;
export type TPointsMaterialParamsOptions = TPointsMaterialPropsOptions & TWithMaterialType;

export type TMaterialParamsOptions =
  | TAbstractMaterialParamsOptions
  | TBasicMaterialParamsOptions
  | TDepthMaterialParamsOptions
  | TDistanceMaterialParamsOptions
  | TNormalMaterialParamsOptions
  | TMatcapMaterialParamsOptions
  | TLambertMaterialParamsOptions
  | TPhongMaterialParamsOptions
  | TToonMaterialParamsOptions
  | TStandardMaterialParamsOptions
  | TPhysicalMaterialParamsOptions
  | TPointsMaterialParamsOptions;
