import type { AudioListener, OrthographicCameraJSONObject, PerspectiveCameraJSONObject, Vector3Like } from 'three';

import type { TAudioService } from '@/Engine/Audio';
import type { TAnyCameraConfig, TAnyCameraWrapper, TCameraWrapperDependencies, TCommonCameraConfig, TPerspectiveCameraOnlyConfig } from '@/Engine/Camera/Models';
import type { TOrthographicCameraOnlyConfig } from '@/Engine/Camera/Models/TOrthographicCameraConfig';
import { isOrthographicCameraWrapper, isPerspectiveCameraWrapper } from '@/Engine/Camera/Utils';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, isDefined } from '@/Engine/Utils';

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
    ...getCommonCameraConfig(entity, json),
    ...additionalConfig
  });
}

function getCommonCameraConfig(entity: TAnyCameraWrapper, json: PerspectiveCameraJSONObject | OrthographicCameraJSONObject): Omit<TCommonCameraConfig, 'position' | 'rotation' | 'audioListener'> {
  const up: Vector3Like | undefined = isDefined(json.up) ? { x: (json.up as any)[0], y: (json.up as any)[1], z: (json.up as any)[2] } : undefined;

  return {
    name: entity.name,
    type: entity.getType(),
    near: json.near,
    far: json.far,
    up,
    layers: json.layers,
    zoom: json.zoom,
    isActive: entity.isActive()
  };
}

function getPerspectiveCameraOnlyConfig(json: PerspectiveCameraJSONObject): TPerspectiveCameraOnlyConfig {
  return {
    fov: json.fov,
    filmGauge: json.filmGauge,
    filmOffset: json.filmOffset,
    focus: json.focus
  };
}

function getOrthographicCameraOnlyConfig(json: OrthographicCameraJSONObject): TOrthographicCameraOnlyConfig {
  return {
    left: json.left,
    right: json.right,
    top: json.top,
    bottom: json.bottom
  };
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
