import { isEmpty } from 'lodash-es';
import type { MaterialJSON } from 'three';

import { serializeColor } from '@/Engine/Color';
import type { MaterialType } from '@/Engine/Material/Constants';
import { BlendEquationMap, BlendingDstFactorMap, BlendingMap, BlendingSrcFactorMap, NormalMapTypesMap, SideMap, StencilFailMap, StencilFuncMap, StencilOpMap } from '@/Engine/Material/Constants';
import type {
  TAllMaterialConfigOptions,
  TMaterialConfig,
  TMaterialConfigOptions,
  TMaterialConfigTextures,
  TMaterialEntityToConfigDependencies,
  TMaterialParamsTextures,
  TMaterials,
  TMaterialWrapper
} from '@/Engine/Material/Models';
import { getOptionName } from '@/Engine/Material/Utils';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TTexture, TTextureAsyncRegistry } from '@/Engine/Texture';
import { filterOutEmptyFields, isNotDefined, nullsToUndefined } from '@/Engine/Utils';

// TODO 15-0-0: materials options are does not match

// TODO 15-0-0: validate
export function materialToConfig(entity: TMaterialWrapper, { textureResourceRegistry }: TMaterialEntityToConfigDependencies): TMaterialConfig {
  const json: MaterialJSON = entity.entity.toJSON();

  const options: TMaterialConfigOptions | undefined = getMaterialOptions(entity);
  const textures: TMaterialConfigTextures | undefined = getMaterialTextures(entity, textureResourceRegistry);

  return filterOutEmptyFields({
    type: json.type as MaterialType,
    options,
    textures,
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
      blendSrc: getOptionName(entity.blendSrc, { ...BlendingSrcFactorMap, ...BlendingDstFactorMap }, 'blendSrc'),
      color: serializeColor((entity as any).color),
      side: getOptionName(entity.side, SideMap, 'side'),
      format: (entity as any).format,
      stencilFunc: getOptionName(entity.stencilFunc, StencilFuncMap, 'stencilFunc'),
      stencilFail: getOptionName(entity.stencilFail, StencilFailMap, 'stencilFail'),
      stencilZFail: getOptionName(entity.stencilZFail, StencilOpMap, 'stencilZFail'),
      stencilZPass: getOptionName(entity.stencilZPass, StencilOpMap, 'stencilZPass'),
      referencePosition: (entity as any).referencePosition,
      combine: (entity as any).combine,
      depthPacking: (entity as any).depthPacking,
      normalMapType: getOptionName((entity as any).normalMapType, NormalMapTypesMap, 'normalMapType'),
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

function getMaterialTextures({ entity }: TMaterialWrapper, textureResourceRegistry: TTextureAsyncRegistry): TMaterialConfigTextures | undefined | never {
  const maps: TMaterialParamsTextures = getMaps(entity);
  const mapsKeys: { [key: string]: string } = {};

  Object.entries(maps).forEach(([key, value]: [string, TTexture]): void | never => {
    const textureName: string | undefined = textureResourceRegistry.findKeyByValue(value);
    if (isNotDefined(textureName)) throw new Error(`[Serialization] Cannot find a texture with name "${value}" in the registry.`);
    // eslint-disable-next-line functional/immutable-data
    mapsKeys[key] = textureName;
  });

  return isEmpty(mapsKeys) ? undefined : mapsKeys;
}

function isTextureKey(key: string): key is keyof TMaterialParamsTextures {
  return key.toLowerCase().endsWith('map');
}

function getMaps(entity: TMaterials): TMaterialParamsTextures {
  return filterOutEmptyFields(
    Object.entries(entity).reduce((acc: TMaterialParamsTextures, [key, value]): TMaterialParamsTextures => {
      if (isTextureKey(key)) {
        // eslint-disable-next-line functional/immutable-data
        acc[key] = value as TMaterialParamsTextures[typeof key];
      }
      return acc;
    }, {})
  );
}
