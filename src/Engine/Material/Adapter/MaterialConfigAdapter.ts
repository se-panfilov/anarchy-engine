import { BlendingSrcFactorMap } from 'src/Engine/Material/Constants/BlendingSrcFactorName';

import { BlendEquationMap, BlendingDstFactorMap, BlendingMap, CombineMap, DepthPackingStrategiesMap, NormalMapTypesMap, PixelFormatMap, SideMap, StencilOpMap } from '@/Engine/Material/Constants';
import { StencilFuncMap } from '@/Engine/Material/Constants/StencilFuncName';
import type { IMaterialConfig, IMaterialParams } from '@/Engine/Material/Models';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: IMaterialConfig): IMaterialParams {
  const { blending, blendDst, blendEquation, blendSrc, side, format, stencilFunc, stencilFail, stencilZFail, stencilZPass, combine, depthPacking, normalMapType, ...rest } = config;

  let params: IMaterialParams = {} as IMaterialParams;

  if (isDefined(blending)) params = { ...params, blending: BlendingMap[blending] };
  if (isDefined(blendDst)) params = { ...params, blendDst: BlendingDstFactorMap[blendDst] };
  if (isDefined(blendEquation)) params = { ...params, blendEquation: BlendEquationMap[blendEquation] };
  if (isDefined(blendSrc)) params = { ...params, blendSrc: { ...BlendingSrcFactorMap, ...BlendingDstFactorMap }[blendSrc] };
  if (isDefined(side)) params = { ...params, side: SideMap[side] };
  if (isDefined(format)) params = { ...params, format: PixelFormatMap[format] };
  if (isDefined(stencilFunc)) params = { ...params, stencilFunc: StencilFuncMap[stencilFunc] };
  if (isDefined(stencilFail)) params = { ...params, stencilFail: StencilOpMap[stencilFail] };
  if (isDefined(stencilZFail)) params = { ...params, stencilZFail: StencilOpMap[stencilZFail] };
  if (isDefined(stencilZPass)) params = { ...params, stencilZPass: StencilOpMap[stencilZPass] };
  if (isDefined(combine)) params = { ...params, combine: CombineMap[combine] };
  if (isDefined(depthPacking)) params = { ...params, depthPacking: DepthPackingStrategiesMap[depthPacking] };
  if (isDefined(normalMapType)) params = { ...params, normalMapType: NormalMapTypesMap[normalMapType] };

  return {
    ...params,
    ...rest
  };
}
