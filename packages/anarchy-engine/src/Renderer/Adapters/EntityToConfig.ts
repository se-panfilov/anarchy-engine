import { extractSerializableRegistrableFields } from '@hellpig/anarchy-engine/Mixins';
import type { TRendererConfig, TRendererParams, TRendererWrapper } from '@hellpig/anarchy-engine/Renderer/Models';
import { filterOutEmptyFields } from '@hellpig/anarchy-shared/Utils';

export function rendererEntityToConfig(entity: TRendererWrapper): TRendererConfig {
  const params: TRendererParams = entity.getParams();

  return filterOutEmptyFields({
    precision: params.precision,
    alpha: params.alpha,
    premultipliedAlpha: params.premultipliedAlpha,
    antialias: params.antialias,
    stencil: params.stencil,
    preserveDrawingBuffer: params.preserveDrawingBuffer,
    powerPreference: params.powerPreference,
    depth: params.depth,
    logarithmicDepthBuffer: params.logarithmicDepthBuffer,
    failIfMajorPerformanceCaveat: params.failIfMajorPerformanceCaveat,
    mode: params.mode,
    isShadowMapEnabled: entity.isShadowMapEnabled(),
    maxPixelRatio: entity.entity.getPixelRatio(),
    isActive: entity.isActive(),
    ...extractSerializableRegistrableFields(entity)
  });
}
