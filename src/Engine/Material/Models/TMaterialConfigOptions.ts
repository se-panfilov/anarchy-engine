import type { Vector2Like } from 'three';
import type { Vector3Like } from 'three/src/math/Vector3';

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
export type TDistanceMaterialConfigOptions = TOmitParamsOnlyFields<TWithReferencePositionConfig<TDistanceMaterialPropsOptions>> & TMaterialConfigFields;
export type TNormalMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TNormalMaterialPropsOptions>> & TMaterialConfigFields;
export type TMatcapMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TMatcapMaterialPropsOptions>> & TMaterialConfigFields;
export type TLambertMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TLambertMaterialPropsOptions>> & TMaterialConfigFields;
export type TPhongMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TPhongMaterialPropsOptions>> & TMaterialConfigFields;
export type TToonMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TToonMaterialPropsOptions>> & TMaterialConfigFields;
export type TStandardMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TStandardMaterialPropsOptions>> & TMaterialConfigFields;
export type TPhysicalMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TWithClearCoatNormalScaleConfig<TPhysicalMaterialPropsOptions>>> & TMaterialConfigFields;
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

type TWithReferencePositionConfig<T> = Omit<T, 'referencePosition'> & Readonly<{ referencePosition?: Vector3Like }>;
type TWithNormalScaleConfig<T> = Omit<T, 'normalScale'> & Readonly<{ normalScale?: Vector2Like }>;
type TWithClearCoatNormalScaleConfig<T> = Omit<T, 'clearcoatNormalScale'> & Readonly<{ clearcoatNormalScale?: Vector2Like }>;
