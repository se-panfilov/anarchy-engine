import type { AudioListener, OrthographicCameraJSONObject, PerspectiveCameraJSONObject } from 'three';

import type { TAudioService } from '@/Engine/Audio';
import type { TCameraConfig, TCameraWrapper, TCameraWrapperDependencies } from '@/Engine/Camera/Models';
import { extractSerializableRegistrableFields } from '@/Engine/Mixins';
import { filterOutEmptyFields, isDefined } from '@/Engine/Utils';

export function cameraToConfig(entity: TCameraWrapper, { audioService }: Pick<TCameraWrapperDependencies, 'audioService'>): TCameraConfig {
  const { drive } = entity;

  const json: PerspectiveCameraJSONObject | OrthographicCameraJSONObject = entity.entity.toJSON().object;

  return filterOutEmptyFields({
    near: json.near,
    far: json.far,
    fov: (json as PerspectiveCameraJSONObject).fov ?? undefined,
    filmGauge: (json as PerspectiveCameraJSONObject).filmGauge ?? undefined,
    filmOffset: (json as PerspectiveCameraJSONObject).filmOffset ?? undefined,
    focus: (json as PerspectiveCameraJSONObject).focus ?? undefined,
    layers: json.layers,
    zoom: json.zoom,
    isActive: entity.isActive(),
    audioListener: getAudioListenerName(json, audioService),
    ...extractSerializableRegistrableFields(entity),
    ...drive.serialize()
  });
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
