import type { MaterialJSON } from 'three';

import type { MaterialType } from '@/Engine/Material/Constants';
import type { TAllMaterialConfigOptions, TMaterialConfig, TMaterialConfigOptions, TMaterialWrapper } from '@/Engine/Material/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, nullsToUndefined } from '@/Engine/Utils';

// TODO 15-0-0: validate
export function materialToConfig(entity: TMaterialWrapper): TMaterialConfig {
  const json: MaterialJSON = entity.entity.toJSON();

  const options: TMaterialConfigOptions | undefined = getMaterialOptions(entity);

  console.log('XXX options', options);

  return filterOutEmptyFields({
    type: json.type as MaterialType,
    options,
    ...extractSerializableRegistrableFields(entity)
  });
}

function getMaterialOptions({ entity }: TMaterialWrapper): TAllMaterialConfigOptions | undefined {
  // Should more or less match threejs's MaterialParameters type
  return filterOutEmptyFields(
    nullsToUndefined({
      blending: entity.blending,
      blendDst: entity.blendDst,
      blendEquation: entity.blendEquation,
      blendSrc: entity.blendSrc,
      color: `#${(entity as any).color.getHexString()}`,
      side: entity.side,
      format: (entity as any).format,
      stencilFunc: entity.stencilFunc,
      stencilFail: entity.stencilFail,
      stencilZFail: entity.stencilZFail,
      stencilZPass: entity.stencilZPass,
      referencePosition: (entity as any).referencePosition,
      normalScale: (entity as any).normalScale,
      combine: (entity as any).combine,
      depthPacking: (entity as any).depthPacking,
      normalMapType: (entity as any).normalMapType,
      alphaHash: entity.alphaHash,
      alphaTest: entity.alphaTest,
      alphaToCoverage: entity.alphaToCoverage,
      blendAlpha: entity.blendAlpha,
      blendColor: entity.blendColor,
      blendDstAlpha: entity.blendDstAlpha,
      blendEquationAlpha: entity.blendEquationAlpha,
      blendSrcAlpha: entity.blendSrcAlpha,
      clipIntersection: entity.clipIntersection,
      clippingPlanes: entity.clippingPlanes,
      clipShadows: entity.clipShadows,
      colorWrite: entity.colorWrite,
      depthFunc: entity.depthFunc,
      depthTest: entity.depthTest,
      depthWrite: entity.depthWrite,
      opacity: entity.opacity,
      polygonOffset: entity.polygonOffset,
      polygonOffsetFactor: entity.polygonOffsetFactor,
      polygonOffsetUnits: entity.polygonOffsetUnits,
      precision: entity.precision,
      premultipliedAlpha: entity.premultipliedAlpha,
      forceSinglePass: entity.forceSinglePass,
      allowOverride: entity.allowOverride,
      dithering: entity.dithering,
      shadowSide: entity.shadowSide,
      toneMapped: entity.toneMapped,
      transparent: entity.transparent,
      vertexColors: entity.vertexColors,
      visible: entity.visible,
      stencilWrite: entity.stencilWrite,
      stencilRef: entity.stencilRef,
      stencilWriteMask: entity.stencilWriteMask,
      stencilFuncMask: entity.stencilFuncMask
    })
  );
}
