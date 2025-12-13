import { isEmpty } from 'lodash-es';
import type { MaterialJSON, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PointsMaterial } from 'three';

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
import { eulerToXyz, filterOutEmptyFields, isDefined, isNotDefined, nullsToUndefined, vector2ToXy, vector3ToXyz } from '@/Engine/Utils';

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

function getMaterialOptions({ entity }: TMaterialWrapper): TOptional<TMaterialConfigOptions> | undefined {
  return filterOutEmptyFields(
    nullsToUndefined({
      alphaHash: entity.alphaHash,
      alphaTest: entity.alphaTest,
      alphaToCoverage: entity.alphaToCoverage,
      anisotropy: (entity as MeshPhysicalMaterial).anisotropy,
      anisotropyRotation: (entity as MeshPhysicalMaterial).anisotropyRotation,
      aoMapIntensity: (entity as MeshPhongMaterial).aoMapIntensity,
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
      bumpScale: (entity as MeshPhongMaterial).bumpScale,
      clearcoat: (entity as MeshPhysicalMaterial).clearcoat,
      clearcoatNormalScale: isDefined((entity as MeshPhysicalMaterial).clearcoatNormalScale) ? vector2ToXy((entity as MeshPhysicalMaterial).clearcoatNormalScale) : undefined,
      clearcoatRoughness: (entity as MeshPhysicalMaterial).clearcoatRoughness,
      clipIntersection: entity.clipIntersection,
      clipShadows: entity.clipShadows,
      clippingPlanes: entity.clippingPlanes,
      color: serializeColorWhenPossible((entity as MeshBasicMaterial).color),
      colorWrite: entity.colorWrite,
      combine: isDefined((entity as MeshBasicMaterial).combine) ? getOptionName((entity as MeshBasicMaterial).combine, CombineMap, 'combine') : undefined,
      dashSize: (entity as any).dashSize,
      depthFunc: entity.depthFunc,
      depthPacking: isDefined((entity as MeshDepthMaterial).depthPacking) ? getOptionName((entity as MeshDepthMaterial).depthPacking, DepthPackingStrategiesMap, 'depthPacking') : undefined,
      depthTest: entity.depthTest,
      depthWrite: entity.depthWrite,
      displacementBias: (entity as MeshPhongMaterial).displacementBias,
      displacementScale: (entity as MeshPhongMaterial).displacementScale,
      dithering: entity.dithering,
      emissive: serializeColorWhenPossible((entity as MeshLambertMaterial).emissive),
      emissiveIntensity: (entity as MeshLambertMaterial).emissiveIntensity,
      envMapIntensity: (entity as MeshStandardMaterial).envMapIntensity,
      envMapRotation: isDefined((entity as MeshPhongMaterial).envMapRotation) ? eulerToXyz((entity as MeshPhongMaterial).envMapRotation) : undefined,
      farDistance: (entity as any).farDistance,
      flatShading: (entity as MeshStandardMaterial).flatShading,
      fog: (entity as MeshPhongMaterial).fog,
      forceSinglePass: entity.forceSinglePass,
      gapSize: (entity as any).gapSize,
      ior: (entity as MeshPhysicalMaterial).ior,
      iridescence: (entity as MeshPhysicalMaterial).iridescence,
      iridescenceIOR: (entity as MeshPhysicalMaterial).iridescenceIOR,
      iridescenceThicknessRange: (entity as MeshPhysicalMaterial).iridescenceThicknessRange,
      lightMapIntensity: (entity as MeshPhongMaterial).lightMapIntensity,
      linewidth: (entity as any).linewidth,
      matcap: (entity as MeshMatcapMaterial).matcap,
      metalness: (entity as MeshStandardMaterial).metalness,
      nearDistance: (entity as any).nearDistance,
      normalMapType: getOptionName((entity as MeshStandardMaterial).normalMapType, NormalMapTypesMap, 'normalMapType'),
      normalScale: isDefined((entity as MeshStandardMaterial).normalScale) ? vector2ToXy((entity as any).normalScale) : undefined,
      opacity: entity.opacity,
      polygonOffset: entity.polygonOffset,
      polygonOffsetFactor: entity.polygonOffsetFactor,
      polygonOffsetUnits: entity.polygonOffsetUnits,
      precision: entity.precision,
      premultipliedAlpha: entity.premultipliedAlpha,
      referencePosition: isDefined((entity as any).referencePosition) ? vector3ToXyz((entity as any).referencePosition) : undefined,
      reflectivity: (entity as MeshPhysicalMaterial).reflectivity,
      refractionRatio: (entity as MeshBasicMaterial).refractionRatio,
      rotation: isDefined((entity as any).rotation) ? eulerToXyz((entity as any).rotation) : undefined,
      roughness: (entity as MeshStandardMaterial).roughness,
      scale: (entity as any).scale,
      shadowSide: entity.shadowSide,
      sheen: (entity as MeshPhysicalMaterial).sheen,
      sheenColor: serializeColorWhenPossible((entity as MeshPhysicalMaterial).sheenColor),
      sheenRoughness: (entity as MeshPhysicalMaterial).sheenRoughness,
      shininess: (entity as MeshPhongMaterial).shininess,
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
      transmission: (entity as MeshPhysicalMaterial).transmission,
      transparent: entity.transparent,
      vertexColors: entity.vertexColors,
      visible: entity.visible,
      wireframe: (entity as MeshPhongMaterial).wireframe,
      // wireframeLinecap: (entity as MeshPhongMaterial).wireframeLinecap
      // wireframeLinejoin: (entity as MeshPhongMaterial).wireframeLinejoin
      wireframeLinewidth: (entity as MeshPhongMaterial).wireframeLinewidth
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
