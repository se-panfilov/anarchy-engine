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

export type TAbstractMaterialConfigOptions = TOmitParamsOnlyFields<TAbstractMaterialPropsOptions> & TMaterialConfigFields;
export type TBasicMaterialConfigOptions = TOmitParamsOnlyFields<TBasicMaterialPropsOptions> & TMaterialConfigFields;
export type TDepthMaterialConfigOptions = TOmitParamsOnlyFields<TDepthMaterialPropsOptions> & TMaterialConfigFields;
export type TDistanceMaterialConfigOptions = TOmitParamsOnlyFields<TDistanceMaterialPropsOptions> & TMaterialConfigFields;
export type TNormalMaterialConfigOptions = TOmitParamsOnlyFields<TNormalMaterialPropsOptions> & TMaterialConfigFields;
export type TMatcapMaterialConfigOptions = TOmitParamsOnlyFields<TMatcapMaterialPropsOptions> & TMaterialConfigFields;
export type TLambertMaterialConfigOptions = TOmitParamsOnlyFields<TLambertMaterialPropsOptions> & TMaterialConfigFields;
export type TPhongMaterialConfigOptions = TOmitParamsOnlyFields<TPhongMaterialPropsOptions> & TMaterialConfigFields;
export type TToonMaterialConfigOptions = TOmitParamsOnlyFields<TToonMaterialPropsOptions> & TMaterialConfigFields;
export type TStandardMaterialConfigOptions = TOmitParamsOnlyFields<TStandardMaterialPropsOptions> & TMaterialConfigFields;
export type TPhysicalMaterialConfigOptions = TOmitParamsOnlyFields<TPhysicalMaterialPropsOptions> & TMaterialConfigFields;
export type TPointsMaterialConfigOptions = TOmitParamsOnlyFields<TPointsMaterialPropsOptions> & TMaterialConfigFields;
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
