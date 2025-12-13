import { BlendEquationMap, BlendingDstFactorMap, BlendingMap, BlendingSrcFactorMap, CombineMap, DepthPackingStrategiesMap, NormalMapTypesMap, SideMap, StencilOpMap } from '@Anarchy/Engine/Material/Constants';
import { StencilFuncMap } from '@Anarchy/Engine/Material/Constants/StencilFuncName';
import type { TMaterialConfig, TMaterialConfigToParamsDependencies, TMaterialParams, TMaterialParamsOptions, TMaterialParamsTextures } from '@Anarchy/Engine/Material/Models';
import type { TTexture } from '@Anarchy/Engine/Texture';
import { isDefined } from '@Anarchy/Shared/Utils';
import type { Vector2Like } from 'three';
import { Vector2 } from 'three';

export function configToParams(config: TMaterialConfig, { textureService }: TMaterialConfigToParamsDependencies): TMaterialParams {
  let options: TMaterialParamsOptions = {} as TMaterialParamsOptions;

  if (isDefined(config.options)) {
    const { blending, blendDst, blendEquation, blendSrc, side, stencilFunc, stencilFail, stencilZFail, stencilZPass, normalScale, combine, depthPacking, normalMapType, ...rest } =
      config.options as typeof config.options & Readonly<{ normalScale?: Vector2Like }>;

    options = { ...rest };

    if (isDefined(blending)) options = { ...options, blending: BlendingMap[blending] };
    if (isDefined(blendDst)) options = { ...options, blendDst: BlendingDstFactorMap[blendDst] };
    if (isDefined(blendEquation)) options = { ...options, blendEquation: BlendEquationMap[blendEquation] };
    if (isDefined(blendSrc)) options = { ...options, blendSrc: { ...BlendingSrcFactorMap, ...BlendingDstFactorMap }[blendSrc] };
    if (isDefined(side)) options = { ...options, side: SideMap[side] };
    // if (isDefined(format)) options = { ...options, format: PixelFormatMap[format] };
    if (isDefined(stencilFunc)) options = { ...options, stencilFunc: StencilFuncMap[stencilFunc] };
    if (isDefined(stencilFail)) options = { ...options, stencilFail: StencilOpMap[stencilFail] };
    if (isDefined(stencilZFail)) options = { ...options, stencilZFail: StencilOpMap[stencilZFail] };
    if (isDefined(stencilZPass)) options = { ...options, stencilZPass: StencilOpMap[stencilZPass] };
    if (isDefined(combine)) options = { ...options, combine: CombineMap[combine] };
    if (isDefined(depthPacking)) options = { ...options, depthPacking: DepthPackingStrategiesMap[depthPacking] };
    if (isDefined(normalMapType)) options = { ...options, normalMapType: NormalMapTypesMap[normalMapType] };
    // if (isDefined(referencePosition)) options = { ...options, referencePosition: new Vector3(referencePosition.x, referencePosition.y, referencePosition.z) };
    if (isDefined(normalScale)) options = { ...options, normalScale: new Vector2(normalScale.x, normalScale.y) };
  }

  let textures: TMaterialParamsTextures | undefined = undefined;
  if (isDefined(config.textures)) {
    textures = {};

    Object.entries(config.textures).forEach(([key, value]: [string, string]): void => {
      const textureEntity: TTexture = textureService.getResourceRegistry().getByKey(value);
      textures = { ...textures, [key]: textureEntity };
    });
  }

  return {
    ...config,
    textures,
    options
  };
}
