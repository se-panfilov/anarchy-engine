import type { Object3DJSONObject, Vector2Like } from 'three';

import type { LightType } from '@/Engine/Light/Constants';
import type {
  TAbstractLightConfig,
  TAbstractLightWrapper,
  TAmbientLightConfig,
  TDirectionalLightConfig,
  TDirectionalLightShadowConfig,
  TDirectionalLightWrapper,
  THemisphereLightConfig,
  THemisphereLightWrapper,
  TLight,
  TLightShadowConfig,
  TPointLightConfig,
  TPointLightWrapper,
  TRectAreaLightConfig,
  TRectAreaLightWrapper,
  TSpotLightConfig,
  TSpotLightWrapper
} from '@/Engine/Light/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, isDefined } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function lightToConfig<T extends TLight>(entity: TAbstractLightWrapper<T>): TDirectionalLightConfig | THemisphereLightConfig | TRectAreaLightConfig | TAmbientLightConfig | TSpotLightConfig {
  const { drive } = entity;

  const json: Object3DJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    type: json.type as LightType,
    color: `#${entity.entity.color.getHexString()}`,
    intensity: (json as unknown as TAbstractLightConfig<T>).intensity,
    castShadow: json.castShadow,
    ...onlyDirectionalLightToConfig(entity as TDirectionalLightWrapper),
    ...onlyHemisphereLightToConfig(entity as THemisphereLightWrapper),
    ...onlyRectAreaLightToConfig(entity as TRectAreaLightWrapper),
    ...onlyPointLightToConfig(entity as TPointLightWrapper),
    ...onlySpotLightToConfig(entity as TSpotLightWrapper),
    ...onlyLightShadowToConfig(entity),
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}

export function onlyDirectionalLightToConfig(entity: TDirectionalLightWrapper): Partial<TDirectionalLightConfig> {
  const json: Object3DJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    layers: json.layers,
    matrix: json.matrix,
    up: json.up
  });
}

export function onlyHemisphereLightToConfig(entity: THemisphereLightWrapper): Partial<THemisphereLightConfig> {
  const json: Object3DJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    groundColor: (json as unknown as THemisphereLightConfig).groundColor
  });
}

export function onlyRectAreaLightToConfig(entity: TRectAreaLightWrapper): Partial<TRectAreaLightConfig> {
  const json: Object3DJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    width: (json as unknown as TRectAreaLightConfig).width,
    height: (json as unknown as TRectAreaLightConfig).height
  });
}

export function onlyPointLightToConfig(entity: TPointLightWrapper): Partial<TPointLightConfig> {
  const json: Object3DJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    distance: (json as unknown as TPointLightConfig).distance,
    decay: (json as unknown as TPointLightConfig).decay
  });
}

export function onlySpotLightToConfig(entity: TSpotLightWrapper): Partial<TSpotLightConfig> {
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
  shadow?: TDirectionalLightShadowConfig | TLightShadowConfig;
}> {
  const json: Object3DJSONObject = entity.entity.toJSON().object;

  const shadow: TLightShadowConfig | TDirectionalLightShadowConfig | undefined = (json as unknown as TDirectionalLightConfig | TAbstractLightConfig<T>).shadow;

  return filterOutEmptyFields({
    shadow,
    mapSize: getMapSize(shadow)
  });
}

function getMapSize(shadow: TLightShadowConfig | TDirectionalLightShadowConfig | undefined): Vector2Like | undefined {
  let mapSize: Vector2Like | undefined = undefined;
  if (isDefined(shadow) && isDefined(shadow.mapSize)) {
    mapSize =
      isDefined(shadow?.mapSize) && isDefined((shadow?.mapSize as any)[0]) && isDefined((shadow?.mapSize as any)[1])
        ? { x: (shadow.mapSize as any)[0] as number, y: (shadow.mapSize as any)[1] as number }
        : undefined;
  }
  return mapSize;
}
