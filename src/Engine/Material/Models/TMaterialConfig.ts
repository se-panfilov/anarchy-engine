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

export type TAbstractMaterialConfig = TOmitParamsOnlyFields<TAbstractMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TBasicMaterialConfig = TOmitParamsOnlyFields<TBasicMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TDepthMaterialConfig = TOmitParamsOnlyFields<TDepthMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TDistanceMaterialConfig = TOmitParamsOnlyFields<TDistanceMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TNormalMaterialConfig = TOmitParamsOnlyFields<TNormalMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TMatcapMaterialConfig = TOmitParamsOnlyFields<TMatcapMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TLambertMaterialConfig = TOmitParamsOnlyFields<TLambertMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TPhongMaterialConfig = TOmitParamsOnlyFields<TPhongMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TToonMaterialConfig = TOmitParamsOnlyFields<TToonMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TStandardMaterialConfig = TOmitParamsOnlyFields<TStandardMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TPhysicalMaterialConfig = TOmitParamsOnlyFields<TPhysicalMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TPointsMaterialConfig = TOmitParamsOnlyFields<TPointsMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TMaterialConfig =
  | TAbstractMaterialConfig
  | TBasicMaterialConfig
  | TDepthMaterialConfig
  | TDistanceMaterialConfig
  | TNormalMaterialConfig
  | TMatcapMaterialConfig
  | TLambertMaterialConfig
  | TPhongMaterialConfig
  | TToonMaterialConfig
  | TStandardMaterialConfig
  | TPhysicalMaterialConfig
  | TPointsMaterialConfig;

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
