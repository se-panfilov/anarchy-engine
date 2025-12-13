import type { Vector2Like, Vector3Like } from 'three';
import { Vector2, Vector3 } from 'three';

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
import type { TMaterialConfig, TMaterialConfigToParamsDependencies, TMaterialParams, TMaterialParamsOptions, TMaterialParamsTextures } from '@/Engine/Material/Models';
import type { TTexture } from '@/Engine/Texture';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TMaterialConfig, { textureService }: TMaterialConfigToParamsDependencies): TMaterialParams {
  let options: TMaterialParamsOptions = {} as TMaterialParamsOptions;

  if (isDefined(config.options)) {
    const {
      blending,
      blendDst,
      blendEquation,
      blendSrc,
      side,
      format,
      stencilFunc,
      stencilFail,
      stencilZFail,
      stencilZPass,
      referencePosition,
      normalScale,
      combine,
      depthPacking,
      normalMapType,
      ...rest
    } = config.options as typeof config.options & Readonly<{ referencePosition?: Vector3Like; normalScale?: Vector2Like }>;

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
    if (isDefined(referencePosition)) options = { ...options, referencePosition: new Vector3(referencePosition.x, referencePosition.y, referencePosition.z) };
    if (isDefined(normalScale)) options = { ...options, normalScale: new Vector2(normalScale.x, normalScale.y) };
  }

  let textures: TMaterialParamsTextures | undefined = undefined;
  if (isDefined(config.textures)) {
    textures = {};

    Object.entries(config.textures).forEach(([key, value]: [string, string]): void => {
      const textureEntity: TTexture | undefined = textureService.getResourceRegistry().findByKey(value);
      if (isNotDefined(textureEntity)) throw new Error(`Texture "${value}" not found`);
      textures = { ...textures, [key]: textureEntity };
    });
  }

  const result: any = {
    ...config,
    textures,
    options
  };

  if (config.name === 'physical_metal') {
    console.log('XXX3 clearcoat', result.options?.clearcoat, result.options?.clearcoat === 1.1, result.options?.clearcoat === 1);
    console.log('XXX3 clearcoatRoughness', result.options?.clearcoatRoughness, result.options?.clearcoatRoughness === 0.13, result.options?.clearcoatRoughness === 0.12);
    console.log('XXX3 displacementScale', result.options?.displacementScale, result.options?.displacementScale === 0.2, result.options?.displacementScale === 0);
    console.log('XXX3 ior', result.options?.ior, result.options?.ior === 2.2, result.options?.ior === 2.5);
    console.log('XXX3 iridescence', result.options?.iridescence, result.options?.iridescence === 0.7, result.options?.iridescence === 0.655);
    console.log('XXX3 iridescenceIOR', result.options?.iridescenceIOR, result.options?.iridescenceIOR === 1.7, result.options?.iridescenceIOR === 1.86);
    console.log('XXX3 metalness', result.options?.metalness, result.options?.metalness === 1, result.options?.metalness === 0.97);
    console.log('XXX3 roughness', result.options?.roughness, result.options?.roughness === 0.9, result.options?.roughness === 0.8);
    console.log('XXX3 thickness', result.options?.thickness, result.options?.thickness === 0.1, result.options?.thickness === 0);
    console.log('XXX3 transmission', result.options?.transmission, result.options?.transmission === 0.1, result.options?.transmission === 0);
  }

  return result;
}
