import { isEmpty } from 'lodash-es';
import type {
  LineDashedMaterial,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PointsMaterial
} from 'three';
import type { MeshDistanceMaterialParameters } from 'three/src/materials/MeshDistanceMaterial';
import type { SpriteNodeMaterial } from 'three/src/materials/nodes/NodeMaterials';

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
import { eulerToXyzIfPossible, getOptionNameIfPossible, vector2ToXyIfPossible, vector3ToXyzIfPossible } from '@/Engine/Material/Utils';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import type { TTexture, TTextureAsyncRegistry } from '@/Engine/Texture';
import type { TOptional } from '@/Engine/Utils';
import { filterOutEmptyFields, isNotDefined, nullsToUndefined } from '@/Engine/Utils';

// TODO 15-0-0: validate
export function materialToConfig(entity: TMaterialWrapper, { textureResourceRegistry }: TMaterialEntityToConfigDependencies): TMaterialConfig {
  const options: TMaterialConfigOptions | undefined = getMaterialOptions(entity);
  const textures: TMaterialConfigTextures | undefined = getMaterialTextures(entity, textureResourceRegistry);

  return filterOutEmptyFields({
    type: entity.entity.type as MaterialType,
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
      blendDst: getOptionNameIfPossible(entity.blendDst, BlendingDstFactorMap, 'blendDst'),
      blendDstAlpha: entity.blendDstAlpha,
      blendEquation: getOptionNameIfPossible(entity.blendEquation, BlendEquationMap, 'blendEquation'),
      blendEquationAlpha: entity.blendEquationAlpha,
      blendSrc: getOptionNameIfPossible(entity.blendSrc, { ...BlendingSrcFactorMap, ...BlendingDstFactorMap }, 'blendSrc'),
      blendSrcAlpha: entity.blendSrcAlpha,
      blending: getOptionNameIfPossible(entity.blending, BlendingMap, 'blending'),
      bumpScale: (entity as MeshPhongMaterial).bumpScale,
      clearcoat: (entity as MeshPhysicalMaterial).clearcoat,
      clearcoatNormalScale: vector2ToXyIfPossible((entity as MeshPhysicalMaterial).clearcoatNormalScale),
      clearcoatRoughness: (entity as MeshPhysicalMaterial).clearcoatRoughness,
      clipIntersection: entity.clipIntersection,
      clipShadows: entity.clipShadows,
      clippingPlanes: entity.clippingPlanes,
      color: serializeColorWhenPossible((entity as MeshBasicMaterial).color),
      colorWrite: entity.colorWrite,
      combine: getOptionNameIfPossible((entity as MeshBasicMaterial).combine, CombineMap, 'combine'),
      dashSize: (entity as LineDashedMaterial).dashSize,
      depthFunc: entity.depthFunc,
      depthPacking: getOptionNameIfPossible((entity as MeshDepthMaterial).depthPacking, DepthPackingStrategiesMap, 'depthPacking'),
      depthTest: entity.depthTest,
      depthWrite: entity.depthWrite,
      displacementBias: (entity as MeshPhongMaterial).displacementBias,
      displacementScale: (entity as MeshPhongMaterial).displacementScale,
      dithering: entity.dithering,
      emissive: serializeColorWhenPossible((entity as MeshLambertMaterial).emissive),
      emissiveIntensity: (entity as MeshLambertMaterial).emissiveIntensity,
      envMapIntensity: (entity as MeshStandardMaterial).envMapIntensity,
      envMapRotation: eulerToXyzIfPossible((entity as MeshPhongMaterial).envMapRotation),
      farDistance: (entity as MeshDistanceMaterialParameters).farDistance,
      flatShading: (entity as MeshStandardMaterial).flatShading,
      fog: (entity as MeshPhongMaterial).fog,
      forceSinglePass: entity.forceSinglePass,
      gapSize: (entity as LineDashedMaterial).gapSize,
      ior: (entity as MeshPhysicalMaterial).ior,
      iridescence: (entity as MeshPhysicalMaterial).iridescence,
      iridescenceIOR: (entity as MeshPhysicalMaterial).iridescenceIOR,
      iridescenceThicknessRange: (entity as MeshPhysicalMaterial).iridescenceThicknessRange,
      lightMapIntensity: (entity as MeshPhongMaterial).lightMapIntensity,
      linewidth: (entity as LineDashedMaterial).linewidth,
      matcap: (entity as MeshMatcapMaterial).matcap,
      metalness: (entity as MeshStandardMaterial).metalness,
      nearDistance: (entity as MeshDistanceMaterialParameters).nearDistance,
      normalMapType: getOptionNameIfPossible((entity as MeshStandardMaterial).normalMapType, NormalMapTypesMap, 'normalMapType'),
      normalScale: vector2ToXyIfPossible((entity as MeshStandardMaterial).normalScale),
      opacity: entity.opacity,
      polygonOffset: entity.polygonOffset,
      polygonOffsetFactor: entity.polygonOffsetFactor,
      polygonOffsetUnits: entity.polygonOffsetUnits,
      precision: entity.precision,
      premultipliedAlpha: entity.premultipliedAlpha,
      referencePosition: vector3ToXyzIfPossible((entity as MeshDistanceMaterialParameters).referencePosition),
      reflectivity: (entity as MeshPhysicalMaterial).reflectivity,
      refractionRatio: (entity as MeshBasicMaterial).refractionRatio,
      rotation: (entity as SpriteNodeMaterial).rotation,
      roughness: (entity as MeshStandardMaterial).roughness,
      scale: (entity as LineDashedMaterial).scale,
      shadowSide: entity.shadowSide,
      sheen: (entity as MeshPhysicalMaterial).sheen,
      sheenColor: serializeColorWhenPossible((entity as MeshPhysicalMaterial).sheenColor),
      sheenRoughness: (entity as MeshPhysicalMaterial).sheenRoughness,
      shininess: (entity as MeshPhongMaterial).shininess,
      side: getOptionNameIfPossible(entity.side, SideMap, 'side'),
      size: (entity as PointsMaterial).size,
      sizeAttenuation: (entity as PointsMaterial).sizeAttenuation,
      specular: serializeColorWhenPossible((entity as MeshPhongMaterial).specular),
      specularColor: serializeColorWhenPossible((entity as MeshPhysicalMaterial).specularColor),
      specularIntensity: (entity as MeshPhysicalMaterial).specularIntensity,
      stencilFail: getOptionNameIfPossible(entity.stencilFail, StencilFailMap, 'stencilFail'),
      stencilFunc: getOptionNameIfPossible(entity.stencilFunc, StencilFuncMap, 'stencilFunc'),
      stencilFuncMask: entity.stencilFuncMask,
      stencilRef: entity.stencilRef,
      stencilWrite: entity.stencilWrite,
      stencilWriteMask: entity.stencilWriteMask,
      stencilZFail: getOptionNameIfPossible(entity.stencilZFail, StencilOpMap, 'stencilZFail'),
      stencilZPass: getOptionNameIfPossible(entity.stencilZPass, StencilOpMap, 'stencilZPass'),
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
