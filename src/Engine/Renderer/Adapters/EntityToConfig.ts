import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TRendererConfig, TRendererWrapper } from '@/Engine/Renderer/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function rendererToConfig(entity: TRendererWrapper): TRendererConfig {
  // TODO 15-0-0: implement
  console.log('XXX entity', entity);

  // TODO 15-0-0: fix any
  return filterOutEmptyFields({
    // precision: entity.precision,
    // alpha: entity.alpha,
    // premultipliedAlpha: entity.premultipliedAlpha,
    // antialias: entity.antialias,
    // stencil: entity.stencil,
    // preserveDrawingBuffer: entity.preserveDrawingBuffer,
    // powerPreference: entity.powerPreference,
    // depth: entity.depth,
    // logarithmicDepthBuffer: entity.logarithmicDepthBuffer,
    // failIfMajorPerformanceCaveat: entity.failIfMajorPerformanceCaveat,
    // mode: entity.mode,
    // isShadowMapEnabled: entity.isShadowMapEnabled,
    // maxPixelRatio: entity.maxPixelRatio,
    isActive: entity.isActive(),
    ...extractSerializableRegistrableFields(entity)
  }) as any;
}
