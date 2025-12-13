import {
  BlendEquationMap,
  BlendingDstFactorMap,
  BlendingMap,
  BlendingSrcFactorMap,
  CombineMap,
  DepthPackingStrategiesMap,
  NormalMapTypesMap,
  PixelFormatMap,
  SideMap,
  StencilOpMap
} from '@/Engine/Material/Constants';
import { StencilFuncMap } from '@/Engine/Material/Constants/StencilFuncName';
import type { TMaterialConfig, TMaterialParams, TMaterialParamsOptions } from '@/Engine/Material/Models';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: TMaterialConfig): TMaterialParams {
  let options: TMaterialParamsOptions = {} as TMaterialParamsOptions;

  if (isDefined(config.options)) {
    const { blending, blendDst, blendEquation, blendSrc, side, format, stencilFunc, stencilFail, stencilZFail, stencilZPass, combine, depthPacking, normalMapType, ...rest } = config.options;

    options = { ...rest };

    if (isDefined(blending)) options = { ...options, blending: BlendingMap[blending] };
    if (isDefined(blendDst)) options = { ...options, blendDst: BlendingDstFactorMap[blendDst] };
    if (isDefined(blendEquation)) options = { ...options, blendEquation: BlendEquationMap[blendEquation] };
    if (isDefined(blendSrc)) options = { ...options, blendSrc: { ...BlendingSrcFactorMap, ...BlendingDstFactorMap }[blendSrc] };
    if (isDefined(side)) options = { ...options, side: SideMap[side] };
    if (isDefined(format)) options = { ...options, format: PixelFormatMap[format] };
    if (isDefined(stencilFunc)) options = { ...options, stencilFunc: StencilFuncMap[stencilFunc] };
    if (isDefined(stencilFail)) options = { ...options, stencilFail: StencilOpMap[stencilFail] };
    if (isDefined(stencilZFail)) options = { ...options, stencilZFail: StencilOpMap[stencilZFail] };
    if (isDefined(stencilZPass)) options = { ...options, stencilZPass: StencilOpMap[stencilZPass] };
    if (isDefined(combine)) options = { ...options, combine: CombineMap[combine] };
    if (isDefined(depthPacking)) options = { ...options, depthPacking: DepthPackingStrategiesMap[depthPacking] };
    if (isDefined(normalMapType)) options = { ...options, normalMapType: NormalMapTypesMap[normalMapType] };
  }

  return {
    ...config,
    options
  };
}
