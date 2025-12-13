import { BlendingMap } from '@/Engine/Material/Constants';
import type { IMaterialConfig, IMaterialParams } from '@/Engine/Material/Models';
import { isDefined } from '@/Engine/Utils';

export function configToParams(config: IMaterialConfig): IMaterialParams {
  const { blending, blendingDstFactor, blendEquation, blendSrc, side, format, stencilFunc, stencilFail, stencilZFail, stencilZPass, combine, depthPacking, normalMapType, ...rest } = config;

  let params: IMaterialParams = {} as IMaterialParams;

  if (isDefined(blending)) params = { ...params, blending: BlendingMap[blending] };
  if (isDefined(blendingDstFactor)) params = { ...params, blending: BlendingDstFactorName[BlendingDstFactor] };
  if (isDefined(blendEquation)) params = { ...params, blendEquation: BlendEquationName[blendEquation] };
  if (isDefined(blendSrc)) params = { ...params, blendSrc: BlendingSrcFactorName[blendSrc] || BlendingDstFactorName[blendSrc] };
  if (isDefined(side)) params = { ...params, side: SideName[side] };
  if (isDefined(format)) params = { ...params, format: PixelFormatName[format] };
  if (isDefined(stencilFunc)) params = { ...params, stencilFunc: StencilFuncName[stencilFunc] };
  if (isDefined(stencilFail)) params = { ...params, stencilFail: StencilOpName[stencilFail] };
  if (isDefined(stencilZFail)) params = { ...params, stencilZFail: StencilOpName[stencilZFail] };
  if (isDefined(stencilZPass)) params = { ...params, stencilZPass: StencilOpName[stencilZPass] };
  if (isDefined(combine)) params = { ...params, combine: CombineName[combine] };
  if (isDefined(depthPacking)) params = { ...params, depthPacking: DepthPackingStrategiesName[depthPacking] };
  if (isDefined(normalMapType)) params = { ...params, normalMapType: NormalMapTypesName[normalMapType] };

  return {
    ...params,
    ...rest
  };
}
