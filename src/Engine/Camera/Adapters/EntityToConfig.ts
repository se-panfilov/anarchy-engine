import type { OrthographicCameraJSONObject, PerspectiveCameraJSONObject } from 'three';
import { AudioListener } from 'three';

import type { TCameraConfig, TCameraWrapper } from '@/Engine/Camera/Models';
import { extractRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, isDefined } from '@/Engine/Utils';

// TODO 15-0-0: validate result
export function cameraToConfig(entity: TCameraWrapper): TCameraConfig {
  const { drive } = entity;

  const json: PerspectiveCameraJSONObject | OrthographicCameraJSONObject = entity.entity.toJSON().object;

  let audioListener: string | undefined = undefined;
  const listener: AudioListener | undefined = entity.entity.children.find((child) => child instanceof AudioListener);
  if (isDefined(listener)) {
    audioListener = {} as any;
  }

  return filterOutEmptyFields({
    near: json.near,
    far: json.far,
    fov: (json as PerspectiveCameraJSONObject).fov ?? undefined,
    aspect: (json as PerspectiveCameraJSONObject).aspect ?? undefined,
    filmGauge: (json as PerspectiveCameraJSONObject).filmGauge ?? undefined,
    filmOffset: (json as PerspectiveCameraJSONObject).filmOffset ?? undefined,
    focus: (json as PerspectiveCameraJSONObject).focus ?? undefined,
    layers: json.layers,
    matrix: json.matrix,
    up: json.up,
    zoom: json.zoom,
    isActive: entity.isActive(),
    audioListener,
    ...extractRegistrableFields(entity),
    ...drive.serialize()
    // TODO 15-0-0: fix any
  });
}
