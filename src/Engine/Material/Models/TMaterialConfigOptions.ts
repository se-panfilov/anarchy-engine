import type { Vector2Like, Vector3Like } from 'three';

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
  TAbstractMaterialParamsOptions,
  TBasicMaterialParamsOptions,
  TDepthMaterialParamsOptions,
  TDistanceMaterialParamsOptions,
  TLambertMaterialParamsOptions,
  TMatcapMaterialParamsOptions,
  TNormalMaterialParamsOptions,
  TPhongMaterialParamsOptions,
  TPhysicalMaterialParamsOptions,
  TPointsMaterialParamsOptions,
  TStandardMaterialParamsOptions,
  TToonMaterialParamsOptions
} from './TMaterialParamsOptions';

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

export type TAbstractMaterialConfigOptions = TOmitParamsOnlyFields<TAbstractMaterialParamsOptions> & TMaterialConfigFields;
export type TBasicMaterialConfigOptions = TOmitParamsOnlyFields<TBasicMaterialParamsOptions> & TMaterialConfigFields;
export type TDepthMaterialConfigOptions = TOmitParamsOnlyFields<TDepthMaterialParamsOptions> & TMaterialConfigFields;
export type TDistanceMaterialConfigOptions = TOmitParamsOnlyFields<TWithReferencePositionConfig<TDistanceMaterialParamsOptions>> & TMaterialConfigFields;
export type TNormalMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TNormalMaterialParamsOptions>> & TMaterialConfigFields;
export type TMatcapMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TMatcapMaterialParamsOptions>> & TMaterialConfigFields;
export type TLambertMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TLambertMaterialParamsOptions>> & TMaterialConfigFields;
export type TPhongMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TPhongMaterialParamsOptions>> & TMaterialConfigFields;
export type TToonMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TToonMaterialParamsOptions>> & TMaterialConfigFields;
export type TStandardMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TStandardMaterialParamsOptions>> & TMaterialConfigFields;
export type TPhysicalMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TWithClearCoatNormalScaleConfig<TPhysicalMaterialParamsOptions>>> & TMaterialConfigFields;
export type TPointsMaterialConfigOptions = TOmitParamsOnlyFields<TPointsMaterialParamsOptions> & TMaterialConfigFields;
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

type TWithReferencePositionConfig<T> = Omit<T, 'referencePosition'> & Readonly<{ referencePosition?: Vector3Like }>;
type TWithNormalScaleConfig<T> = Omit<T, 'normalScale'> & Readonly<{ normalScale?: Vector2Like }>;
type TWithClearCoatNormalScaleConfig<T> = Omit<T, 'clearcoatNormalScale'> & Readonly<{ clearcoatNormalScale?: Vector2Like }>;
