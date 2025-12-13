import type {
  BlendEquationName,
  BlendingDstFactorName,
  BlendingName,
  BlendingSrcFactorName,
  CombineName,
  DepthPackingStrategiesName,
  NormalMapTypesName,
  PixelFormatName,
  SideName,
  StencilFuncName,
  StencilOpName
} from '@/Engine/Material/Constants';

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

type TOmitParamsOnlyFields<T> = Omit<
  T,
  | 'map'
  | 'alphaMap'
  | 'blending'
  | 'blendDst'
  | 'blendEquation'
  | 'blendSrc'
  | 'side'
  | 'format'
  | 'stencilFunc'
  | 'stencilFail'
  | 'stencilZFail'
  | 'stencilZPass'
  | 'combine'
  | 'depthPacking'
  | 'normalMapType'
>;

export type TAbstractMaterialConfigOptions = TOmitParamsOnlyFields<TAbstractMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TBasicMaterialConfigOptions = TOmitParamsOnlyFields<TBasicMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TDepthMaterialConfigOptions = TOmitParamsOnlyFields<TDepthMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TDistanceMaterialConfigOptions = TOmitParamsOnlyFields<TDistanceMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TNormalMaterialConfigOptions = TOmitParamsOnlyFields<TNormalMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TMatcapMaterialConfigOptions = TOmitParamsOnlyFields<TMatcapMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TLambertMaterialConfigOptions = TOmitParamsOnlyFields<TLambertMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TPhongMaterialConfigOptions = TOmitParamsOnlyFields<TPhongMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TToonMaterialConfigOptions = TOmitParamsOnlyFields<TToonMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TStandardMaterialConfigOptions = TOmitParamsOnlyFields<TStandardMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TPhysicalMaterialConfigOptions = TOmitParamsOnlyFields<TPhysicalMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TPointsMaterialConfigOptions = TOmitParamsOnlyFields<TPointsMaterialPropsOptions> & TWithMaterialType & TMaterialConfigFields;
export type TMaterialConfigOptions =
  | TAbstractMaterialConfigOptions
  | TBasicMaterialConfigOptions
  | TDepthMaterialConfigOptions
  | TDistanceMaterialConfigOptions
  | TNormalMaterialConfigOptions
  | TMatcapMaterialConfigOptions
  | TLambertMaterialConfigOptions
  | TPhongMaterialConfigOptions
  | TToonMaterialConfigOptions
  | TStandardMaterialConfigOptions
  | TPhysicalMaterialConfigOptions
  | TPointsMaterialConfigOptions;

export type TMaterialConfigFields = Readonly<{
  blending?: BlendingName;
  blendDst?: BlendingDstFactorName;
  blendEquation?: BlendEquationName;
  blendSrc?: BlendingSrcFactorName | BlendingDstFactorName;
  side?: SideName;
  format?: PixelFormatName;
  stencilFunc?: StencilFuncName;
  stencilFail?: StencilOpName;
  stencilZFail?: StencilOpName;
  stencilZPass?: StencilOpName;
  combine?: CombineName;
  depthPacking?: DepthPackingStrategiesName;
  normalMapType?: NormalMapTypesName;
  // TODO map and alphaMap should be TTexture | null, but idk what it should be in config, so I'm leaving it as string for now
  map?: string | null;
  alphaMap?: string | null;
}>;
