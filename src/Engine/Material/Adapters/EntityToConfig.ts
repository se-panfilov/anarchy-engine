import { isEmpty } from 'lodash-es';
import type { MaterialJSON } from 'three';

import { serializeColorWhenPossible } from '@/Engine/Color';
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
import { eulerToXyz, filterOutEmptyFields, isNotDefined, nullsToUndefined } from '@/Engine/Utils';

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
      alphaHash: entity.alphaHash,
      alphaTest: entity.alphaTest,
      alphaToCoverage: entity.alphaToCoverage,
      attenuationColor: serializeColorWhenPossible((entity as any).attenuationColor),
      attenuationDistance: (entity as any).attenuationDistance,
      blendAlpha: entity.blendAlpha,
      blendColor: serializeColorWhenPossible((entity as any).blendColor),
      blendDst: getOptionName(entity.blendDst, BlendingDstFactorMap, 'blendDst'),
      blendDstAlpha: entity.blendDstAlpha,
      blendEquation: getOptionName(entity.blendEquation, BlendEquationMap, 'blendEquation'),
      blendEquationAlpha: entity.blendEquationAlpha,
      blendSrc: getOptionName(entity.blendSrc, { ...BlendingSrcFactorMap, ...BlendingDstFactorMap }, 'blendSrc'),
      blendSrcAlpha: entity.blendSrcAlpha,
      blending: getOptionName(entity.blending, BlendingMap, 'blending'),
      clearcoat: (entity as any).clearcoat,
      clearcoatRoughness: (entity as any).clearcoatRoughness,
      clipIntersection: entity.clipIntersection,
      clipShadows: entity.clipShadows,
      clippingPlanes: entity.clippingPlanes,
      color: serializeColorWhenPossible((entity as any).color),
      colorWrite: entity.colorWrite,
      combine: (entity as any).combine,
      depthFunc: entity.depthFunc,
      depthPacking: (entity as any).depthPacking,
      depthTest: entity.depthTest,
      depthWrite: entity.depthWrite,
      dithering: entity.dithering,
      emissive: serializeColorWhenPossible((entity as any).emissive),
      emissiveIntensity: (entity as any).emissiveIntensity,
      envMapIntensity: (entity as any).envMapIntensity,
      flatShading: (entity as any).flatShading,
      forceSinglePass: entity.forceSinglePass,
      ior: (entity as any).ior,
      metalness: (entity as any).metalness,
      normalMapType: getOptionName((entity as any).normalMapType, NormalMapTypesMap, 'normalMapType'),
      normalScale: (entity as any).normalScale,
      opacity: entity.opacity,
      polygonOffset: entity.polygonOffset,
      polygonOffsetFactor: entity.polygonOffsetFactor,
      polygonOffsetUnits: entity.polygonOffsetUnits,
      precision: entity.precision,
      premultipliedAlpha: entity.premultipliedAlpha,
      reflectivity: (entity as any).reflectivity,
      refractionRatio: (entity as any).refractionRatio,
      rotation: (entity as any).rotation ? eulerToXyz((entity as any).rotation) : undefined,
      roughness: (entity as any).roughness,
      shadowSide: entity.shadowSide,
      sheen: (entity as any).sheen,
      sheenColor: serializeColorWhenPossible((entity as any).sheenColor),
      sheenRoughness: (entity as any).sheenRoughness,
      side: getOptionName(entity.side, SideMap, 'side'),
      size: (entity as any).size,
      sizeAttenuation: (entity as any).sizeAttenuation,
      specular: serializeColorWhenPossible((entity as any).specular),
      specularColor: serializeColorWhenPossible((entity as any).specularColor),
      specularIntensity: (entity as any).specularIntensity,
      stencilFail: getOptionName(entity.stencilFail, StencilFailMap, 'stencilFail'),
      stencilFunc: getOptionName(entity.stencilFunc, StencilFuncMap, 'stencilFunc'),
      stencilFuncMask: entity.stencilFuncMask,
      stencilRef: entity.stencilRef,
      stencilWrite: entity.stencilWrite,
      stencilWriteMask: entity.stencilWriteMask,
      stencilZFail: getOptionName(entity.stencilZFail, StencilOpMap, 'stencilZFail'),
      stencilZPass: getOptionName(entity.stencilZPass, StencilOpMap, 'stencilZPass'),
      thickness: (entity as any).thickness,
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
