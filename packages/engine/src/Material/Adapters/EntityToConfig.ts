import { serializeColorWhenPossible } from '@Engine/Color';
import type { MaterialType } from '@Engine/Material/Constants';
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
} from '@Engine/Material/Constants';
import type {
  TAnyMaterialWrapper,
  TMaterialConfig,
  TMaterialConfigOptions,
  TMaterialConfigTextures,
  TMaterialEntityToConfigDependencies,
  TMaterialParamsTextures,
  TMaterials
} from '@Engine/Material/Models';
import { eulerToXyzIfPossible, getOptionNameIfPossible, isPhysicalMaterial, vector2ToXyIfPossible } from '@Engine/Material/Utils';
import { extractSerializableRegistrableFields } from '@Engine/Mixins';
import type { TTexture, TTextureAsyncRegistry } from '@Engine/Texture';
import type { TOptional } from '@Engine/Utils';
import { filterOutEmptyFields, nullsToUndefined } from '@Engine/Utils';
import { isEmpty } from 'lodash-es';
import type { LineDashedMaterial, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshPhongMaterial, MeshStandardMaterial, PointsMaterial } from 'three';
import type { SpriteNodeMaterial } from 'three/src/materials/nodes/NodeMaterials';

export function materialToConfig(entity: TAnyMaterialWrapper, { textureResourceRegistry }: TMaterialEntityToConfigDependencies): TMaterialConfig {
  const options: TMaterialConfigOptions | undefined = getMaterialOptions(entity);
  const textures: TMaterialConfigTextures | undefined = getMaterialTextures(entity, textureResourceRegistry);

  return filterOutEmptyFields({
    type: entity.entity.type as MaterialType,
    options,
    textures,
    ...extractSerializableRegistrableFields(entity)
  });
}

function getMaterialOptions({ entity }: TAnyMaterialWrapper): TOptional<TMaterialConfigOptions> | undefined {
  console.log('XXX entity', entity);

  return filterOutEmptyFields(
    nullsToUndefined({
      alphaHash: entity.alphaHash,
      alphaToCoverage: entity.alphaToCoverage,
      anisotropy: isPhysicalMaterial(entity) ? entity.anisotropy : undefined,
      anisotropyRotation: isPhysicalMaterial(entity) ? entity.anisotropyRotation : undefined,
      aoMapIntensity: (entity as MeshPhongMaterial).aoMapIntensity,
      attenuationColor: serializeColorWhenPossible(isPhysicalMaterial(entity) ? entity.attenuationColor : undefined),
      attenuationDistance: isPhysicalMaterial(entity) ? entity.attenuationDistance : undefined,
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
      // clearcoat: isPhysicalMaterial(entity) ? entity.clearcoat : undefined,
      clearcoatNormalScale: vector2ToXyIfPossible(isPhysicalMaterial(entity) ? entity.clearcoatNormalScale : undefined),
      clearcoatRoughness: isPhysicalMaterial(entity) ? entity.clearcoatRoughness : undefined,
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
      // farDistance: (entity as MeshDistanceMaterialParameters).farDistance,
      flatShading: (entity as MeshStandardMaterial).flatShading,
      fog: (entity as MeshPhongMaterial).fog,
      forceSinglePass: entity.forceSinglePass,
      gapSize: (entity as LineDashedMaterial).gapSize,
      ior: isPhysicalMaterial(entity) ? entity.ior : undefined,
      // iridescence: isPhysicalMaterial(entity) ? entity.iridescence : undefined,
      iridescenceIOR: isPhysicalMaterial(entity) ? entity.iridescenceIOR : undefined,
      iridescenceThicknessRange: isPhysicalMaterial(entity) ? entity.iridescenceThicknessRange : undefined,
      lightMapIntensity: (entity as MeshPhongMaterial).lightMapIntensity,
      linewidth: (entity as LineDashedMaterial).linewidth,
      matcap: (entity as MeshMatcapMaterial).matcap,
      metalness: (entity as MeshStandardMaterial).metalness,
      // nearDistance: (entity as MeshDistanceMaterialParameters).nearDistance,
      normalMapType: getOptionNameIfPossible((entity as MeshStandardMaterial).normalMapType, NormalMapTypesMap, 'normalMapType'),
      normalScale: vector2ToXyIfPossible((entity as MeshStandardMaterial).normalScale),
      opacity: entity.opacity,
      polygonOffset: entity.polygonOffset,
      polygonOffsetFactor: entity.polygonOffsetFactor,
      polygonOffsetUnits: entity.polygonOffsetUnits,
      precision: entity.precision,
      premultipliedAlpha: entity.premultipliedAlpha,
      // referencePosition: vector3ToXyzIfPossible((entity as MeshDistanceMaterialParameters).referencePosition),
      reflectivity: isPhysicalMaterial(entity) ? entity.reflectivity : undefined,
      refractionRatio: (entity as MeshBasicMaterial).refractionRatio,
      rotation: (entity as SpriteNodeMaterial).rotation,
      roughness: (entity as MeshStandardMaterial).roughness,
      scale: (entity as LineDashedMaterial).scale,
      shadowSide: entity.shadowSide,
      sheen: isPhysicalMaterial(entity) ? entity.sheen : undefined,
      sheenColor: serializeColorWhenPossible(isPhysicalMaterial(entity) ? entity.sheenColor : undefined),
      sheenRoughness: isPhysicalMaterial(entity) ? entity.sheenRoughness : undefined,
      shininess: (entity as MeshPhongMaterial).shininess,
      side: getOptionNameIfPossible(entity.side, SideMap, 'side'),
      size: (entity as PointsMaterial).size,
      sizeAttenuation: (entity as PointsMaterial).sizeAttenuation,
      specular: serializeColorWhenPossible((entity as MeshPhongMaterial).specular),
      specularColor: serializeColorWhenPossible(isPhysicalMaterial(entity) ? entity.specularColor : undefined),
      specularIntensity: isPhysicalMaterial(entity) ? entity.specularIntensity : undefined,
      stencilFail: getOptionNameIfPossible(entity.stencilFail, StencilFailMap, 'stencilFail'),
      stencilFunc: getOptionNameIfPossible(entity.stencilFunc, StencilFuncMap, 'stencilFunc'),
      stencilFuncMask: entity.stencilFuncMask,
      stencilRef: entity.stencilRef,
      stencilWrite: entity.stencilWrite,
      stencilWriteMask: entity.stencilWriteMask,
      stencilZFail: getOptionNameIfPossible(entity.stencilZFail, StencilOpMap, 'stencilZFail'),
      stencilZPass: getOptionNameIfPossible(entity.stencilZPass, StencilOpMap, 'stencilZPass'),
      thickness: isPhysicalMaterial(entity) ? entity.thickness : undefined,
      toneMapped: entity.toneMapped,
      // transmission: isPhysicalMaterial(entity) ? entity.transmission : undefined,
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

function getMaterialTextures({ entity }: TAnyMaterialWrapper, textureResourceRegistry: TTextureAsyncRegistry): TMaterialConfigTextures | undefined | never {
  const maps: TMaterialParamsTextures = getMaps(entity);
  const mapsKeys: { [key: string]: string } = {};

  Object.entries(maps).forEach(([key, value]: [string, TTexture]): void | never => {
    // eslint-disable-next-line functional/immutable-data
    mapsKeys[key] = textureResourceRegistry.getKeyByValue(value);
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
