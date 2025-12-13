import type { Layers, Object3DJSONObject, Vector2Like } from 'three';
import { Vector2 } from 'three';

import type { TCommonCameraParams } from '@/Engine/Camera';
import { serializeColor } from '@/Engine/Color';
import { LightType } from '@/Engine/Light/Constants';
import type {
  TAbstractLightConfig,
  TAbstractLightParams,
  TAbstractLightWrapper,
  TAmbientLightConfig,
  TDirectionalLightConfig,
  TDirectionalLightParams,
  THemisphereLightConfig,
  THemisphereLightWrapper,
  TLight,
  TLightShadowConfig,
  TLightShadowParams,
  TPointLightConfig,
  TPointLightWrapper,
  TRectAreaLightConfig,
  TRectAreaLightWrapper,
  TSpotLightConfig,
  TSpotLightWrapper
} from '@/Engine/Light/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, isDefined, isNotDefined } from '@/Engine/Utils';

export function lightToConfig<T extends TLight>(entity: TAbstractLightWrapper<T>): TDirectionalLightConfig | THemisphereLightConfig | TRectAreaLightConfig | TAmbientLightConfig | TSpotLightConfig {
  const { drive } = entity;

  const json: Object3DJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    type: json.type as LightType,
    color: serializeColor(entity.entity.color),
    intensity: (json as unknown as TAbstractLightConfig<T>).intensity,
    castShadow: json.castShadow,
    // ...onlyDirectionalLightToConfig(entity as TDirectionalLightWrapper),
    ...onlyHemisphereLightToConfig(entity as THemisphereLightWrapper),
    ...onlyRectAreaLightToConfig(entity as TRectAreaLightWrapper),
    ...onlyPointLightToConfig(entity as TPointLightWrapper),
    ...onlySpotLightToConfig(entity as TSpotLightWrapper),
    ...onlyLightShadowToConfig(entity),
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}

// export function onlyDirectionalLightToConfig(entity: TDirectionalLightWrapper): Partial<TDirectionalLightConfig> {
//   const json: Object3DJSONObject = entity.entity.toJSON().object;
//
//   return filterOutEmptyFields({
//     layers: json.layers,
//     // matrix: json.matrix,
//     // up: json.up
//   });
// }

export function onlyHemisphereLightToConfig(entity: THemisphereLightWrapper): Partial<THemisphereLightConfig> {
  if (entity.getType() !== LightType.Hemisphere) return {} as THemisphereLightConfig;
  return filterOutEmptyFields({
    groundColor: serializeColor(entity.entity.groundColor)
  });
}

export function onlyRectAreaLightToConfig(entity: TRectAreaLightWrapper): Partial<TRectAreaLightConfig> {
  if (entity.getType() !== LightType.RectArea) return {} as TRectAreaLightConfig;
  const json: Object3DJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    width: (json as unknown as TRectAreaLightConfig).width,
    height: (json as unknown as TRectAreaLightConfig).height
  });
}

export function onlyPointLightToConfig(entity: TPointLightWrapper): Partial<TPointLightConfig> {
  if (entity.getType() !== LightType.Point) return {} as TPointLightConfig;
  const json: Object3DJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    distance: (json as unknown as TPointLightConfig).distance,
    decay: (json as unknown as TPointLightConfig).decay
  });
}

export function onlySpotLightToConfig(entity: TSpotLightWrapper): Partial<TSpotLightConfig> {
  if (entity.getType() !== LightType.Spot) return {} as TSpotLightConfig;
  const json: Object3DJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    distance: (json as unknown as TSpotLightConfig).distance,
    angle: (json as unknown as TSpotLightConfig).angle,
    penumbra: (json as unknown as TSpotLightConfig).penumbra,
    decay: (json as unknown as TSpotLightConfig).decay
  });
}

export function onlyLightShadowToConfig<T extends TLight>(
  entity: TAbstractLightWrapper<T>
): Readonly<{
  shadow?: TLightShadowConfig;
}> {
  const json: Object3DJSONObject = entity.entity.toJSON().object;

  const lightConfig = json as unknown as TDirectionalLightParams | TAbstractLightParams;
  const shadow: TLightShadowParams | undefined = lightConfig.shadow;
  if (isNotDefined(shadow)) return {};
  const camera = shadow.camera as TLightShadowConfig['camera'] | undefined;

  const result: Readonly<{ shadow?: TLightShadowConfig }> = filterOutEmptyFields({
    shadow: {
      ...shadow,
      mapSize: getMapSize(shadow),
      camera: undefined as unknown as TCommonCameraParams
    }
  });

  if (isNotDefined(camera)) return result;
  const { far, left, right, top, bottom, near, type, up: upRaw, zoom, layers } = camera;
  const up = isDefined(upRaw) ? { x: (upRaw as any)[0], y: (upRaw as any)[1], z: (upRaw as any)[2] } : undefined;

  // eslint-disable-next-line functional/immutable-data
  result.shadow.camera = {
    far,
    left,
    right,
    top,
    bottom,
    layers: layers as unknown as Layers | number,
    near,
    type,
    up: up as TLightShadowConfig['camera']['up'],
    zoom
  };

  return result;
}

function getMapSize(shadow: TLightShadowConfig | TLightShadowParams | undefined): Vector2Like {
  let mapSize: Vector2Like | undefined = undefined;
  if (isDefined(shadow) && isDefined(shadow.mapSize)) {
    mapSize =
      isDefined(shadow?.mapSize) && isDefined((shadow?.mapSize as any)[0]) && isDefined((shadow?.mapSize as any)[1])
        ? { x: (shadow.mapSize as any)[0] as number, y: (shadow.mapSize as any)[1] as number }
        : undefined;
  }
  return mapSize ?? new Vector2();
}
