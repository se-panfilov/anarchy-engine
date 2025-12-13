import { isEmpty } from 'lodash-es';
import type { MaterialJSON, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PointsMaterial } from 'three';

import { serializeColorWhenPossible } from '@/Engine/Color';
import type { MaterialType } from '@/Engine/Material/Constants';
import {
  BlendEquationMap,
  BlendingDstFactorMap,
  BlendingMap,
  BlendingSrcFactorMap,
  CombineMap,
  DepthPackingStrategiesMap,
  NormalMapTypesMap,
  SideMap,
  StencilFailMap,
  StencilFuncMap,
  StencilOpMap
} from '@/Engine/Material/Constants';
import type {
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
import type { TOptional } from '@/Engine/Utils';
import { eulerToXyz, filterOutEmptyFields, isDefined, isNotDefined, nullsToUndefined, vector2ToXy } from '@/Engine/Utils';

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

// TODO 15-0-0: All this options should apply on config load
function getMaterialOptions({ entity }: TMaterialWrapper): TOptional<TMaterialConfigOptions> | undefined {
  // Should more or less match threejs's MaterialParameters type
  return filterOutEmptyFields(
    nullsToUndefined({
      alphaHash: entity.alphaHash,
      alphaTest: entity.alphaTest,
      alphaToCoverage: entity.alphaToCoverage,
      attenuationColor: serializeColorWhenPossible((entity as MeshPhysicalMaterial).attenuationColor),
      attenuationDistance: (entity as MeshPhysicalMaterial).attenuationDistance,
      blendAlpha: entity.blendAlpha,
      blendColor: serializeColorWhenPossible(entity.blendColor),
      blendDst: getOptionName(entity.blendDst, BlendingDstFactorMap, 'blendDst'),
      blendDstAlpha: entity.blendDstAlpha,
      blendEquation: getOptionName(entity.blendEquation, BlendEquationMap, 'blendEquation'),
      blendEquationAlpha: entity.blendEquationAlpha,
      blendSrc: getOptionName(entity.blendSrc, { ...BlendingSrcFactorMap, ...BlendingDstFactorMap }, 'blendSrc'),
      blendSrcAlpha: entity.blendSrcAlpha,
      blending: getOptionName(entity.blending, BlendingMap, 'blending'),
      clearcoat: (entity as MeshPhysicalMaterial).clearcoat,
      clearcoatRoughness: (entity as MeshPhysicalMaterial).clearcoatRoughness,
      clearcoatNormalScale: isDefined((entity as MeshPhysicalMaterial).clearcoatNormalScale) ? vector2ToXy((entity as MeshPhysicalMaterial).clearcoatNormalScale) : undefined,
      clipIntersection: entity.clipIntersection,
      clipShadows: entity.clipShadows,
      clippingPlanes: entity.clippingPlanes,
      color: serializeColorWhenPossible((entity as MeshBasicMaterial).color),
      colorWrite: entity.colorWrite,
      combine: isDefined((entity as MeshBasicMaterial).combine) ? getOptionName((entity as MeshBasicMaterial).combine, CombineMap, 'combine') : undefined,
      depthFunc: entity.depthFunc,
      depthPacking: isDefined((entity as MeshDepthMaterial).depthPacking) ? getOptionName((entity as MeshDepthMaterial).depthPacking, DepthPackingStrategiesMap, 'depthPacking') : undefined,
      depthTest: entity.depthTest,
      depthWrite: entity.depthWrite,
      dithering: entity.dithering,
      emissive: serializeColorWhenPossible((entity as MeshLambertMaterial).emissive),
      emissiveIntensity: (entity as MeshLambertMaterial).emissiveIntensity,
      envMapIntensity: (entity as MeshStandardMaterial).envMapIntensity,
      flatShading: (entity as MeshStandardMaterial).flatShading,
      forceSinglePass: entity.forceSinglePass,
      ior: (entity as MeshPhysicalMaterial).ior,
      metalness: (entity as MeshStandardMaterial).metalness,
      normalMapType: getOptionName((entity as MeshStandardMaterial).normalMapType, NormalMapTypesMap, 'normalMapType'),
      normalScale: isDefined((entity as MeshStandardMaterial).normalScale) ? vector2ToXy((entity as any).normalScale) : undefined,
      opacity: entity.opacity,
      polygonOffset: entity.polygonOffset,
      polygonOffsetFactor: entity.polygonOffsetFactor,
      polygonOffsetUnits: entity.polygonOffsetUnits,
      precision: entity.precision,
      premultipliedAlpha: entity.premultipliedAlpha,
      reflectivity: (entity as MeshPhysicalMaterial).reflectivity,
      refractionRatio: (entity as MeshBasicMaterial).refractionRatio,
      rotation: isDefined((entity as any).rotation) ? eulerToXyz((entity as any).rotation) : undefined,
      roughness: (entity as MeshStandardMaterial).roughness,
      shadowSide: entity.shadowSide,
      sheen: (entity as MeshPhysicalMaterial).sheen,
      sheenColor: serializeColorWhenPossible((entity as MeshPhysicalMaterial).sheenColor),
      sheenRoughness: (entity as MeshPhysicalMaterial).sheenRoughness,
      side: getOptionName(entity.side, SideMap, 'side'),
      size: (entity as PointsMaterial).size,
      sizeAttenuation: (entity as PointsMaterial).sizeAttenuation,
      specular: serializeColorWhenPossible((entity as MeshPhongMaterial).specular),
      specularColor: serializeColorWhenPossible((entity as MeshPhysicalMaterial).specularColor),
      specularIntensity: (entity as MeshPhysicalMaterial).specularIntensity,
      stencilFail: getOptionName(entity.stencilFail, StencilFailMap, 'stencilFail'),
      stencilFunc: getOptionName(entity.stencilFunc, StencilFuncMap, 'stencilFunc'),
      stencilFuncMask: entity.stencilFuncMask,
      stencilRef: entity.stencilRef,
      stencilWrite: entity.stencilWrite,
      stencilWriteMask: entity.stencilWriteMask,
      stencilZFail: getOptionName(entity.stencilZFail, StencilOpMap, 'stencilZFail'),
      stencilZPass: getOptionName(entity.stencilZPass, StencilOpMap, 'stencilZPass'),
      thickness: (entity as MeshPhysicalMaterial).thickness,
      toneMapped: entity.toneMapped,
      transparent: entity.transparent,
      vertexColors: entity.vertexColors,
      visible: entity.visible
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
