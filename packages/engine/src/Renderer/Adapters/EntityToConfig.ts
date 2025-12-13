import { extractSerializableRegistrableFields } from '@/Mixins';
import type { TRendererConfig, TRendererParams, TRendererWrapper } from '@/Renderer/Models';
import { filterOutEmptyFields } from '@/Utils';

export function rendererToConfig(entity: TRendererWrapper): TRendererConfig {
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
