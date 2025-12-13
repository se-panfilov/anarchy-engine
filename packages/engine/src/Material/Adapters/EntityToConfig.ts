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
import {
  eulerToXyzIfPossible,
  getOptionNameIfPossible,
  isBasicMaterial,
  isDepthMaterial,
  isLambertMaterial,
  isLineDashedMaterial,
  isMatcapMaterial,
  isNodeMaterial,
  isPhongMaterial,
  isPhysicalMaterial,
  isPointsMaterial,
  isStandardMaterial,
  vector2ToXyIfPossible
} from '@Engine/Material/Utils';
import { extractSerializableRegistrableFields } from '@Engine/Mixins';
import type { TTexture, TTextureAsyncRegistry } from '@Engine/Texture';
import type { TOptional } from '@Engine/Utils';
import { filterOutEmptyFields, nullsToUndefined } from '@Engine/Utils';
import { isEmpty } from 'lodash-es';

export function materialToConfig(entity: TAnyMaterialWrapper, { textureResourceRegistry }: TMaterialEntityToConfigDependencies): TMaterialConfig {
  const options: TMaterialConfigOptions | undefined = getMaterialOptions(entity);
  const textures: TMaterialConfigTextures | undefined = getMaterialTextures(entity, textureResourceRegistry);

  console.log('XXX', options);

  return filterOutEmptyFields({
    type: entity.entity.type as MaterialType,
    options,
    textures,
    ...extractSerializableRegistrableFields(entity)
  });
}

function getMaterialOptions({ entity }: TAnyMaterialWrapper): TOptional<TMaterialConfigOptions> | undefined {
  return filterOutEmptyFields(
    nullsToUndefined({
      alphaHash: entity.alphaHash,
      alphaToCoverage: entity.alphaToCoverage,
      anisotropy: isPhysicalMaterial(entity) ? entity.anisotropy : undefined,
      anisotropyRotation: isPhysicalMaterial(entity) ? entity.anisotropyRotation : undefined,
      aoMapIntensity: isPhongMaterial(entity) ? entity.aoMapIntensity : undefined,
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
      bumpScale: isPhongMaterial(entity) ? entity.bumpScale : undefined,
      clearcoat: isPhysicalMaterial(entity) ? entity.clearcoat : undefined,
      clearcoatNormalScale: vector2ToXyIfPossible(isPhysicalMaterial(entity) ? entity.clearcoatNormalScale : undefined),
      clearcoatRoughness: isPhysicalMaterial(entity) ? entity.clearcoatRoughness : undefined,
      clipIntersection: entity.clipIntersection,
      clipShadows: entity.clipShadows,
      clippingPlanes: entity.clippingPlanes,
      color: serializeColorWhenPossible(isBasicMaterial(entity) ? entity.color : undefined),
      colorWrite: entity.colorWrite,
      combine: getOptionNameIfPossible(isBasicMaterial(entity) ? entity.combine : undefined, CombineMap, 'combine'),
      dashSize: isLineDashedMaterial(entity) ? entity.dashSize : undefined,
      depthFunc: entity.depthFunc,
      depthPacking: getOptionNameIfPossible(isDepthMaterial(entity) ? entity.depthPacking : undefined, DepthPackingStrategiesMap, 'depthPacking'),
      depthTest: entity.depthTest,
      depthWrite: entity.depthWrite,
      displacementBias: isPhongMaterial(entity) ? entity.displacementBias : undefined,
      displacementScale: isPhongMaterial(entity) ? entity.displacementScale : undefined,
      dithering: entity.dithering,
      emissive: serializeColorWhenPossible(isLambertMaterial(entity) ? entity.emissive : undefined),
      emissiveIntensity: isLambertMaterial(entity) ? entity.emissiveIntensity : undefined,
      envMapIntensity: isStandardMaterial(entity) ? entity.envMapIntensity : undefined,
      envMapRotation: eulerToXyzIfPossible(isPhongMaterial(entity) ? entity.envMapRotation : undefined),
      // farDistance: isMeshDistanceMaterialParameters(entity) ? entity.farDistance : undefined,
      flatShading: isStandardMaterial(entity) ? entity.flatShading : undefined,
      fog: isPhongMaterial(entity) ? entity.fog : undefined,
      forceSinglePass: entity.forceSinglePass,
      gapSize: isLineDashedMaterial(entity) ? entity.gapSize : undefined,
      ior: isPhysicalMaterial(entity) ? entity.ior : undefined,
      iridescence: isPhysicalMaterial(entity) ? entity.iridescence : undefined,
      iridescenceIOR: isPhysicalMaterial(entity) ? entity.iridescenceIOR : undefined,
      iridescenceThicknessRange: isPhysicalMaterial(entity) ? entity.iridescenceThicknessRange : undefined,
      lightMapIntensity: isPhongMaterial(entity) ? entity.lightMapIntensity : undefined,
      linewidth: isLineDashedMaterial(entity) ? entity.linewidth : undefined,
      matcap: isMatcapMaterial(entity) ? entity.matcap : undefined,
      metalness: isStandardMaterial(entity) ? entity.metalness : undefined,
      // nearDistance: isMeshDistanceMaterialParameters(entity) ? entity.nearDistance : undefined,
      normalMapType: getOptionNameIfPossible(isStandardMaterial(entity) ? entity.normalMapType : undefined, NormalMapTypesMap, 'normalMapType'),
      normalScale: vector2ToXyIfPossible(isStandardMaterial(entity) ? entity.normalScale : undefined),
      opacity: entity.opacity,
      polygonOffset: entity.polygonOffset,
      polygonOffsetFactor: entity.polygonOffsetFactor,
      polygonOffsetUnits: entity.polygonOffsetUnits,
      precision: entity.precision,
      premultipliedAlpha: entity.premultipliedAlpha,
      // referencePosition: vector3ToXyzIfPossible(isMeshDistanceMaterialParameters(entity) ? entity.referencePosition : undefined),
      reflectivity: isPhysicalMaterial(entity) ? entity.reflectivity : undefined,
      refractionRatio: isBasicMaterial(entity) ? entity.refractionRatio : undefined,
      rotation: isNodeMaterial(entity) ? entity.rotation : undefined,
      roughness: isStandardMaterial(entity) ? entity.roughness : undefined,
      scale: isLineDashedMaterial(entity) ? entity.scale : undefined,
      shadowSide: entity.shadowSide,
      sheen: isPhysicalMaterial(entity) ? entity.sheen : undefined,
      sheenColor: serializeColorWhenPossible(isPhysicalMaterial(entity) ? entity.sheenColor : undefined),
      sheenRoughness: isPhysicalMaterial(entity) ? entity.sheenRoughness : undefined,
      shininess: isPhongMaterial(entity) ? entity.shininess : undefined,
      side: getOptionNameIfPossible(entity.side, SideMap, 'side'),
      size: isPointsMaterial(entity) ? entity.size : undefined,
      sizeAttenuation: isPointsMaterial(entity) ? entity.sizeAttenuation : undefined,
      specular: serializeColorWhenPossible(isPhongMaterial(entity) ? entity.specular : undefined),
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
      transmission: isPhysicalMaterial(entity) ? entity.transmission : undefined,
      transparent: entity.transparent,
      vertexColors: entity.vertexColors,
      visible: entity.visible,
      wireframe: isPhongMaterial(entity) ? entity.wireframe : undefined,
      // wireframeLinecap: isMeshPhongMaterial(entity) ? entity.wireframeLinecap : undefined
      // wireframeLinejoin: isMeshPhongMaterial(entity) ? entity.wireframeLinejoin : undefined
      wireframeLinewidth: isPhongMaterial(entity) ? entity.wireframeLinewidth : undefined
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
