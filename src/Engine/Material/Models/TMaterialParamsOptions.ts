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

export type TAbstractMaterialParamsOptions = TAbstractMaterialPropsOptions;
export type TBasicMaterialParamsOptions = TBasicMaterialPropsOptions;
export type TDepthMaterialParamsOptions = TDepthMaterialPropsOptions;
export type TDistanceMaterialParamsOptions = TDistanceMaterialPropsOptions;
export type TNormalMaterialParamsOptions = TNormalMaterialPropsOptions;
export type TMatcapMaterialParamsOptions = TMatcapMaterialPropsOptions;
export type TLambertMaterialParamsOptions = TLambertMaterialPropsOptions;
export type TPhongMaterialParamsOptions = TPhongMaterialPropsOptions;
export type TToonMaterialParamsOptions = TToonMaterialPropsOptions;
export type TStandardMaterialParamsOptions = TStandardMaterialPropsOptions;
export type TPhysicalMaterialParamsOptions = TPhysicalMaterialPropsOptions;
export type TPointsMaterialParamsOptions = TPointsMaterialPropsOptions;

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
