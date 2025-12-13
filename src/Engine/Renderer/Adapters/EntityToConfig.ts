import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TRendererConfig, TRendererWrapper } from '@/Engine/Renderer/Models';
import { filterOutEmptyFields } from '@/Engine/Utils';

export function rendererToConfig(entity: TRendererWrapper): TRendererConfig {
  // TODO 15-0-0: implement
  console.log('XXX1 entity', entity);
  console.log('XXX2 entity.entity', entity.entity);

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
    isShadowMapEnabled: entity.isShadowMapEnabled(),
    maxPixelRatio: entity.entity.getPixelRatio(),
    isActive: entity.isActive(),
    ...extractSerializableRegistrableFields(entity)
  });
}
