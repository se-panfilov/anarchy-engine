import type { TAudioService } from '@Engine/Audio';
import type {
  TAnyCameraConfig,
  TAnyCameraWrapper,
  TCameraWrapperDependencies,
  TCommonCameraConfig,
  TCommonCameraParams,
  TOrthographicCameraParams,
  TPerspectiveCameraOnlyConfig,
  TPerspectiveCameraParams
} from '@Engine/Camera/Models';
import type { TOrthographicCameraOnlyConfig } from '@Engine/Camera/Models/TOrthographicCameraConfig';
import { isOrthographicCameraWrapper, isPerspectiveCameraWrapper } from '@Engine/Camera/Utils';
import type { TShadowCameraParams } from '@Engine/Light';
import { extractSerializableRegistrableFields } from '@Engine/Mixins';
import { isVector3Like } from '@Engine/Utils';
import { filterOutEmptyFields, isDefined } from '@Shared/Utils';
import type { AudioListener, OrthographicCameraJSONObject, PerspectiveCameraJSONObject, Vector3Like } from 'three';

// Sometimes Camera's "drive" might hold old values (position, rotation), cause controls might not update it (they are update values directly)
export function cameraToConfig(entity: TAnyCameraWrapper, { audioService }: Pick<TCameraWrapperDependencies, 'audioService'>): TAnyCameraConfig {
  const { drive } = entity;

  const json: PerspectiveCameraJSONObject | OrthographicCameraJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    audioListener: getAudioListenerName(json, audioService),
    ...getCameraOnlyConfig(entity),
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
}

export function getCameraOnlyConfig(entity: TAnyCameraWrapper): Omit<TCommonCameraConfig, 'position' | 'rotation' | 'audioListener'> & (TPerspectiveCameraOnlyConfig | TOrthographicCameraOnlyConfig) {
  const json: PerspectiveCameraJSONObject | OrthographicCameraJSONObject = entity.entity.toJSON().object;

  let additionalConfig: TPerspectiveCameraOnlyConfig | TOrthographicCameraOnlyConfig = {};
  if (isPerspectiveCameraWrapper(entity)) additionalConfig = getPerspectiveCameraOnlyConfig(json as PerspectiveCameraJSONObject);
  if (isOrthographicCameraWrapper(entity)) additionalConfig = getOrthographicCameraOnlyConfig(json as OrthographicCameraJSONObject);

  return filterOutEmptyFields({
    name: entity.name,
    type: entity.getType(),
    isActive: entity.isActive(),
    ...getCommonCameraConfig(json),
    ...additionalConfig
  });
}

export function getCommonCameraConfig(
  json: PerspectiveCameraJSONObject | OrthographicCameraJSONObject | TCommonCameraParams | TShadowCameraParams
): Omit<TCommonCameraConfig, 'position' | 'rotation' | 'audioListener' | 'name' | 'type' | 'isActive'> {
  let up: Vector3Like | undefined = undefined;
  if (isDefined(json.up)) {
    if (Array.isArray(json.up)) up = { x: (json.up as any)[0], y: (json.up as any)[1], z: (json.up as any)[2] };
    else if (isVector3Like(json.up)) up = { x: json.up.x, y: json.up.y, z: json.up.z };
    else throw new Error(`[Camera]: Cannot serialize: Invalid up vector provided in camera JSON: ${json.up}. Expected Vector3Like or array of numbers.`);
  }

  return {
    near: json.near,
    far: json.far,
    up,
    layers: json.layers,
    zoom: json.zoom
  };
}

export function getPerspectiveCameraOnlyConfig({ fov, filmGauge, filmOffset, focus }: PerspectiveCameraJSONObject | TPerspectiveCameraParams): TPerspectiveCameraOnlyConfig {
  return { fov, filmGauge, filmOffset, focus };
}

export function getOrthographicCameraOnlyConfig({ left, right, top, bottom }: OrthographicCameraJSONObject | TOrthographicCameraParams): TOrthographicCameraOnlyConfig {
  return { left, right, top, bottom };
}

function getAudioListenerName(json: PerspectiveCameraJSONObject | OrthographicCameraJSONObject, audioService: TAudioService): string | undefined {
  let result: string | undefined = undefined;
  const listener: AudioListener | undefined = json.children?.find((child: any): boolean => child.type === 'AudioListener') as AudioListener | undefined;
  if (isDefined(listener)) {
    result = {} as any;
    const { uuid } = listener;
    result = audioService.getListenersRegistry().findKey((l: AudioListener): boolean => l.uuid === uuid);
  }
  return result;
}
