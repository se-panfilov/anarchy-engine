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

type IOmitParamsOnlyFields<T> = Omit<
  T,
  'blending' | 'blendDst' | 'blendEquation' | 'blendSrc' | 'side' | 'format' | 'stencilFunc' | 'stencilFail' | 'stencilZFail' | 'stencilZPass' | 'combine' | 'depthPacking' | 'normalMapType'
>;

export type TAbstractMaterialConfig = IOmitParamsOnlyFields<TAbstractMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TBasicMaterialConfig = IOmitParamsOnlyFields<TBasicMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TDepthMaterialConfig = IOmitParamsOnlyFields<TDepthMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TDistanceMaterialConfig = IOmitParamsOnlyFields<TDistanceMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TNormalMaterialConfig = IOmitParamsOnlyFields<TNormalMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TMatcapMaterialConfig = IOmitParamsOnlyFields<TMatcapMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TLambertMaterialConfig = IOmitParamsOnlyFields<TLambertMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TPhongMaterialConfig = IOmitParamsOnlyFields<TPhongMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TToonMaterialConfig = IOmitParamsOnlyFields<TToonMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TStandardMaterialConfig = IOmitParamsOnlyFields<TStandardMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TPhysicalMaterialConfig = IOmitParamsOnlyFields<TPhysicalMaterialProps> & TWithMaterialType & TMaterialConfigFields;
export type TPointsMaterialConfig = IOmitParamsOnlyFields<TPointsMaterialProps> & TWithMaterialType & TMaterialConfigFields;
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
}>;
