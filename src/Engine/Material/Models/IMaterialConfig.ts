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
  IAbstractMaterialProps,
  IBasicMaterialProps,
  IDepthMaterialProps,
  IDistanceMaterialProps,
  ILambertMaterialProps,
  IMatcapMaterialProps,
  INormalMaterialProps,
  IPhongMaterialProps,
  IPhysicalMaterialProps,
  IPointsMaterialProps,
  IStandardMaterialProps,
  IToonMaterialProps
} from './IMaterialProps';
import type { IWithMaterialType } from './IWithMaterialType';

type IOmitParamsOnlyFields<T> = Omit<
  T,
  'blending' | 'blendDst' | 'blendEquation' | 'blendSrc' | 'side' | 'format' | 'stencilFunc' | 'stencilFail' | 'stencilZFail' | 'stencilZPass' | 'combine' | 'depthPacking' | 'normalMapType'
>;

export type IAbstractMaterialConfig = IOmitParamsOnlyFields<IAbstractMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type IBasicMaterialConfig = IOmitParamsOnlyFields<IBasicMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type IDepthMaterialConfig = IOmitParamsOnlyFields<IDepthMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type IDistanceMaterialConfig = IOmitParamsOnlyFields<IDistanceMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type INormalMaterialConfig = IOmitParamsOnlyFields<INormalMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type IMatcapMaterialConfig = IOmitParamsOnlyFields<IMatcapMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type ILambertMaterialConfig = IOmitParamsOnlyFields<ILambertMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type IPhongMaterialConfig = IOmitParamsOnlyFields<IPhongMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type IToonMaterialConfig = IOmitParamsOnlyFields<IToonMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type IStandardMaterialConfig = IOmitParamsOnlyFields<IStandardMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type IPhysicalMaterialConfig = IOmitParamsOnlyFields<IPhysicalMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type IPointsMaterialConfig = IOmitParamsOnlyFields<IPointsMaterialProps> & IWithMaterialType & IMaterialConfigFields;
export type IMaterialConfig =
  | IAbstractMaterialConfig
  | IBasicMaterialConfig
  | IDepthMaterialConfig
  | IDistanceMaterialConfig
  | INormalMaterialConfig
  | IMatcapMaterialConfig
  | ILambertMaterialConfig
  | IPhongMaterialConfig
  | IToonMaterialConfig
  | IStandardMaterialConfig
  | IPhysicalMaterialConfig
  | IPointsMaterialConfig;

export type IMaterialConfigFields = Readonly<{
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
