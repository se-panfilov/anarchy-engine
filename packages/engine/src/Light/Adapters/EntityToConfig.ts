import type { DirectionalLightShadow, Object3DJSONObject, PointLightShadow, SpotLightShadow, Vector2Like } from 'three';
import { Vector2 } from 'three';

import type { TCommonCameraParams } from '@/Camera';
import { getCommonCameraConfig, getOrthographicCameraOnlyConfig, getPerspectiveCameraOnlyConfig, isOrthographicCameraParams, isPerspectiveCameraParams } from '@/Camera';
import { serializeColor } from '@/Color';
import { LightType } from '@/Light/Constants';
import type {
  TAbstractLightConfig,
  TAbstractLightWrapper,
  TAmbientLightConfig,
  TAnyLight,
  TDirectionalLightConfig,
  TDirectionalLightParams,
  THemisphereLightConfig,
  THemisphereLightWrapper,
  TLightShadowConfig,
  TLightShadowParams,
  TPointLightConfig,
  TPointLightParams,
  TPointLightWrapper,
  TRectAreaLightConfig,
  TRectAreaLightWrapper,
  TShadowCameraConfig,
  TShadowCameraParams,
  TSpotLightConfig,
  TSpotLightParams,
  TSpotLightWrapper
} from '@/Light/Models';
import { extractSerializableRegistrableFields } from '@/Mixins';
import type { TWriteable } from '@/Utils';
import { filterOutEmptyFields, isDefined, isNotDefined, vector2ToXy } from '@/Utils';

export function lightToConfig<T extends TAnyLight>(entity: TAbstractLightWrapper<T>): TDirectionalLightConfig | THemisphereLightConfig | TRectAreaLightConfig | TAmbientLightConfig | TSpotLightConfig {
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

export function onlyLightShadowToConfig<T extends TAnyLight>(
  entity: TAbstractLightWrapper<T>
): Readonly<{
  shadow?: TLightShadowConfig;
}> {
  const json: Object3DJSONObject = entity.entity.toJSON().object;

  const lightConfig = json as unknown as TDirectionalLightParams | TPointLightParams | TSpotLightParams;
  const shadow: TLightShadowParams | undefined = lightConfig.shadow;
  if (isNotDefined(shadow)) return {};
  const camera: TShadowCameraParams = shadow.camera;

  const result: Readonly<{ shadow: TWriteable<TLightShadowConfig> }> = filterOutEmptyFields({
    shadow: {
      ...shadow,
      mapSize: getMapSize(shadow) ?? getMapSize(entity.entity.shadow),
      normalBias: shadow.normalBias ?? entity.entity.shadow?.normalBias,
      camera: undefined as unknown as TCommonCameraParams
    }
  });

  if (isNotDefined(camera)) return result;

  const cameraConfig: TShadowCameraConfig = Object.assign(getCommonCameraConfig(camera), { type: camera.type });
  // eslint-disable-next-line functional/immutable-data
  if (isPerspectiveCameraParams(camera)) Object.assign(cameraConfig, getPerspectiveCameraOnlyConfig(camera));
  // eslint-disable-next-line functional/immutable-data
  if (isOrthographicCameraParams(camera)) Object.assign(cameraConfig, getOrthographicCameraOnlyConfig(camera));

  // eslint-disable-next-line functional/immutable-data
  result.shadow.camera = cameraConfig;

  return result;
}

function getMapSize(shadow: TLightShadowConfig | TLightShadowParams | DirectionalLightShadow | PointLightShadow | SpotLightShadow | undefined): Vector2Like {
  let mapSize: Vector2Like | undefined = undefined;
  if (isDefined(shadow) && isDefined(shadow.mapSize)) {
    mapSize =
      isDefined(shadow?.mapSize) && isDefined((shadow?.mapSize as any)[0]) && isDefined((shadow?.mapSize as any)[1])
        ? { x: (shadow.mapSize as any)[0] as number, y: (shadow.mapSize as any)[1] as number }
        : undefined;
  }
  return vector2ToXy(mapSize ?? new Vector2());
}
