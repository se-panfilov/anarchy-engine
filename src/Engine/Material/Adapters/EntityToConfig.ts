import type { MaterialJSON } from 'three';

import type { MaterialType } from '@/Engine/Material/Constants';
import { BlendEquationMap, BlendingDstFactorMap, BlendingMap, BlendingSrcFactorMap, SideMap, StencilFailMap, StencilFuncMap, StencilOpMap } from '@/Engine/Material/Constants';
import type { TAllMaterialConfigOptions, TMaterialConfig, TMaterialConfigOptions, TMaterialWrapper } from '@/Engine/Material/Models';
import { getOptionName } from '@/Engine/Material/Utils';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, nullsToUndefined } from '@/Engine/Utils';

// TODO 15-0-0: validate
export function materialToConfig(entity: TMaterialWrapper): TMaterialConfig {
  const json: MaterialJSON = entity.entity.toJSON();

  const options: TMaterialConfigOptions | undefined = getMaterialOptions(entity);

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
      blending: getOptionName(entity.blending, BlendingMap, 'blending'),
      blendDst: getOptionName(entity.blendDst, BlendingDstFactorMap, 'blendDst'),
      blendEquation: getOptionName(entity.blendEquation, BlendEquationMap, 'blendEquation'),
      blendSrc: getOptionName(entity.blendSrc, BlendingSrcFactorMap, 'blendSrc'),
      color: `#${(entity as any).color.getHexString()}`,
      side: getOptionName(entity.side, SideMap, 'side'),
      format: (entity as any).format,
      stencilFunc: getOptionName(entity.stencilFunc, StencilFuncMap, 'stencilFunc'),
      stencilFail: getOptionName(entity.stencilFail, StencilFailMap, 'stencilFail'),
      stencilZFail: getOptionName(entity.stencilZFail, StencilOpMap, 'stencilZFail'),
      stencilZPass: getOptionName(entity.stencilZPass, StencilOpMap, 'stencilZPass'),
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
