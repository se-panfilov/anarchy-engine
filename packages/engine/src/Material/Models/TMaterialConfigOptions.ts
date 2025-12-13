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
  StencilFailName,
  StencilFuncName,
  StencilOpName
} from '@Engine/Material/Constants';
import type { TEulerLike } from '@Engine/ThreeLib';
import type { Vector2Like, Vector3Like } from 'three';

import type {
  TBasicMaterialParamsOptions,
  TDepthMaterialParamsOptions,
  TDistanceMaterialParamsOptions,
  TLambertMaterialParamsOptions,
  TLineBasicMaterialParamsOptions,
  TLineDashedMaterialParamsOptions,
  TMatcapMaterialParamsOptions,
  TNormalMaterialParamsOptions,
  TPhongMaterialParamsOptions,
  TPhysicalMaterialParamsOptions,
  TPointsMaterialParamsOptions,
  TShaderMaterialParamsOptions,
  TShadowMaterialParamsOptions,
  TSpriteMaterialParamsOptions,
  TStandardMaterialParamsOptions,
  TToonMaterialParamsOptions
} from './TMaterialParamsOptions';

type TOmitParamsOnlyFields<T> = Omit<
  T,
  | 'blendDst'
  | 'blendEquation'
  | 'blendSrc'
  | 'blending'
  | 'clearcoatNormalScale'
  | 'clippingPlanes'
  | 'combine'
  | 'depthPacking'
  | 'envMapRotation'
  | 'format'
  | 'matcap'
  | 'normalMapType'
  | 'normalScale'
  | 'referencePosition'
  | 'side'
  | 'stencilFail'
  | 'stencilFunc'
  | 'stencilZFail'
  | 'stencilZPass'
  | 'uniformsGroups'

  //Maps are not allowed in options (they will be in textures as references)
  | 'alphaMap'
  | 'anisotropyMap'
  | 'aoMap'
  | 'bumpMap'
  | 'clearcoatMap'
  | 'clearcoatNormalMap'
  | 'clearcoatRoughnessMap'
  | 'displacementMap'
  | 'emissiveMap'
  | 'envMap'
  | 'gradientMap'
  | 'iridescenceMap'
  | 'iridescenceThicknessMap'
  | 'lightMap'
  | 'map'
  | 'metalnessMap'
  | 'normalMap'
  | 'roughnessMap'
  | 'sheenColorMap'
  | 'sheenRoughnessMap'
  | 'specularColorMap'
  | 'specularIntensityMap'
  | 'specularMap'
  | 'thicknessMap'
  | 'transmissionMap'
>;

export type TBasicMaterialConfigOptions = TOmitParamsOnlyFields<TBasicMaterialParamsOptions> & TMaterialConfigFields;
export type TDepthMaterialConfigOptions = TOmitParamsOnlyFields<TDepthMaterialParamsOptions> & TMaterialConfigFields;
export type TDistanceMaterialConfigOptions = TOmitParamsOnlyFields<TWithReferencePositionConfig<TDistanceMaterialParamsOptions>> & TMaterialConfigFields;
export type TLambertMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TLambertMaterialParamsOptions>> & TMaterialConfigFields;
export type TLineBasicMaterialConfigOptions = TOmitParamsOnlyFields<TLineBasicMaterialParamsOptions> & TMaterialConfigFields;
export type TLineDashedMaterialConfigOptions = TOmitParamsOnlyFields<TLineDashedMaterialParamsOptions> & TMaterialConfigFields;
export type TMatcapMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TMatcapMaterialParamsOptions>> & TMaterialConfigFields;
export type TNormalMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TNormalMaterialParamsOptions>> & TMaterialConfigFields;
export type TPhongMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TPhongMaterialParamsOptions>> & TMaterialConfigFields;
export type TPhysicalMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TWithClearCoatNormalScaleConfig<TPhysicalMaterialParamsOptions>>> & TMaterialConfigFields;
export type TPointsMaterialConfigOptions = TOmitParamsOnlyFields<TPointsMaterialParamsOptions> & TMaterialConfigFields;
export type TShaderMaterialConfigOptions = TOmitParamsOnlyFields<TShaderMaterialParamsOptions> & TMaterialConfigFields;
export type TShadowMaterialConfigOptions = TOmitParamsOnlyFields<TShadowMaterialParamsOptions> & TMaterialConfigFields;
export type TSpriteMaterialConfigOptions = TOmitParamsOnlyFields<TSpriteMaterialParamsOptions> & TMaterialConfigFields;
export type TStandardMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TStandardMaterialParamsOptions>> & TMaterialConfigFields;
export type TToonMaterialConfigOptions = TOmitParamsOnlyFields<TWithNormalScaleConfig<TToonMaterialParamsOptions>> & TMaterialConfigFields;

export type TMaterialConfigOptions =
  | TBasicMaterialConfigOptions
  | TDepthMaterialConfigOptions
  | TDistanceMaterialConfigOptions
  | TLambertMaterialConfigOptions
  | TLineBasicMaterialConfigOptions
  | TLineDashedMaterialConfigOptions
  | TMatcapMaterialConfigOptions
  | TNormalMaterialConfigOptions
  | TPhongMaterialConfigOptions
  | TPhysicalMaterialConfigOptions
  | TPointsMaterialConfigOptions
  | TShaderMaterialConfigOptions
  | TShadowMaterialConfigOptions
  | TSpriteMaterialConfigOptions
  | TStandardMaterialConfigOptions
  | TToonMaterialConfigOptions;

export type TMaterialConfigFields = Readonly<{
  blendDst?: BlendingDstFactorName;
  blendEquation?: BlendEquationName;
  blendSrc?: BlendingSrcFactorName | BlendingDstFactorName;
  blending?: BlendingName;
  clearcoatNormalScale?: Vector2Like;
  combine?: CombineName;
  depthPacking?: DepthPackingStrategiesName;
  envMapRotation?: TEulerLike;
  format?: PixelFormatName;
  normalMapType?: NormalMapTypesName;
  normalScale?: Vector2Like;
  referencePosition?: Vector3Like;
  side?: SideName;
  stencilFail?: StencilFailName;
  stencilFunc?: StencilFuncName;
  stencilZFail?: StencilOpName;
  stencilZPass?: StencilOpName;
}>;

type TWithReferencePositionConfig<T> = Omit<T, 'referencePosition'> & Readonly<{ referencePosition?: Vector3Like }>;
type TWithNormalScaleConfig<T> = Omit<T, 'normalScale'> & Readonly<{ normalScale?: Vector2Like }>;
type TWithClearCoatNormalScaleConfig<T> = Omit<T, 'clearcoatNormalScale'> & Readonly<{ clearcoatNormalScale?: Vector2Like }>;
