import { BlendingSrcFactorMap, BlendingSrcFactorName } from 'src/Engine/Material/Constants/BlendingSrcFactorName';

import {
  BlendEquationMap,
  BlendEquationName,
  BlendingDstFactorMap,
  BlendingDstFactorName,
  BlendingMap,
  CombineMap,
  CombineName,
  DepthPackingStrategiesMap,
  DepthPackingStrategiesName,
  NormalMapTypesMap,
  NormalMapTypesName,
  PixelFormatMap,
  PixelFormatName,
  SideMap,
  SideName,
  StencilOpMap,
  StencilOpName
} from '@/Engine/Material/Constants';
import { StencilFuncMap, StencilFuncName } from '@/Engine/Material/Constants/StencilFuncName';
import type { IMaterialConfig, IMaterialParams } from '@/Engine/Material/Models';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: IMaterialConfig): IMaterialParams {
  const { blending, blendingDstFactor, blendEquation, blendSrc, side, format, stencilFunc, stencilFail, stencilZFail, stencilZPass, combine, depthPacking, normalMapType, ...rest } = config;

  let params: IMaterialParams = {} as IMaterialParams;

  if (isDefined(blending)) params = { ...params, blending: BlendingMap[blending] };
  if (isDefined(blendingDstFactor)) params = { ...params, blending: BlendingDstFactorMap[BlendingDstFactorName] };
  if (isDefined(blendEquation)) params = { ...params, blendEquation: BlendEquationMap[BlendEquationName] };
  if (isDefined(blendSrc)) params = { ...params, blendSrc: BlendingSrcFactorMap[BlendingSrcFactorName] || BlendingDstFactorMap[BlendingDstFactorName] };
  if (isDefined(side)) params = { ...params, side: SideMap[SideName] };
  if (isDefined(format)) params = { ...params, format: PixelFormatMap[PixelFormatName] };
  if (isDefined(stencilFunc)) params = { ...params, stencilFunc: StencilFuncMap[StencilFuncName] };
  if (isDefined(stencilFail)) params = { ...params, stencilFail: StencilOpMap[StencilOpName] };
  if (isDefined(stencilZFail)) params = { ...params, stencilZFail: StencilOpMap[StencilOpName] };
  if (isDefined(stencilZPass)) params = { ...params, stencilZPass: StencilOpMap[StencilOpName] };
  if (isDefined(combine)) params = { ...params, combine: CombineMap[CombineName] };
  if (isDefined(depthPacking)) params = { ...params, depthPacking: DepthPackingStrategiesMap[DepthPackingStrategiesName] };
  if (isDefined(normalMapType)) params = { ...params, normalMapType: NormalMapTypesMap[NormalMapTypesName] };

  return {
    ...params,
    ...rest
  };
}
