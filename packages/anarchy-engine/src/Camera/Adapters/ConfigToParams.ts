import type { TAudioService } from '@Anarchy/Engine/Audio';
import type { TAnyCameraParams, TCameraServiceDependencies, TCommonCameraConfig } from '@Anarchy/Engine/Camera/Models';
import type { TShadowCameraConfig, TShadowCameraParams } from '@Anarchy/Engine/Light';
import { object3dConfigToParams } from '@Anarchy/Engine/ThreeLib';
import { isDefined, isNotDefined, omitInObjectWithoutMutation } from '@hellpig/anarchy-shared/Utils';
import type { AudioListener } from 'three';
import { Vector3 } from 'three';

export function cameraConfigToParams(config: TCommonCameraConfig, { audioService }: TCameraServiceDependencies): TAnyCameraParams | never {
  let listener: AudioListener | undefined;
  if (isDefined(config.audioListener)) {
    listener = audioService.getListenersRegistry().findByKey(config.audioListener);
    if (isNotDefined(listener)) throw new Error(`Camera: cannot create camera from config: listener ("${config.audioListener}") is not found`);
  }

  return {
    ...configToParamsCameraOnly(config),
    ...configToParamsAudioListener(config, audioService)
  };
}

export function configToParamsCameraOnly(config: TCommonCameraConfig): Omit<TAnyCameraParams, 'audioListener'> {
  const { position, rotation, scale, layers, name, isActive, type } = omitInObjectWithoutMutation(config, ['audioListener']);

  return {
    name,
    isActive,
    type,
    ...configToParamsCameraOptionsOnly(config),
    ...object3dConfigToParams({ position, rotation, scale, layers })
  };
}

export function configToParamsCameraOptionsOnly(config: TCommonCameraConfig | TShadowCameraConfig): TShadowCameraParams {
  const { scale, layers, lookAt, up, ...rest } = omitInObjectWithoutMutation(config, ['audioListener' as any, 'audioListener', 'position', 'rotation', 'name', 'isActive', 'type']) as
    | TCommonCameraConfig
    | TShadowCameraConfig;

  return {
    ...rest,
    ...object3dConfigToParams({ scale, layers }),
    lookAt: lookAt ? new Vector3(lookAt.x, lookAt.y, lookAt.z) : undefined,
    up: up ? new Vector3(up.x, up.y, up.z) : undefined
  };
}

function configToParamsAudioListener(config: TCommonCameraConfig, audioService: TAudioService): Pick<TAnyCameraParams, 'audioListener'> {
  let audioListener: AudioListener | undefined;
  if (isDefined(config.audioListener)) {
    audioListener = audioService.getListenersRegistry().getByKey(config.audioListener);
  }

  return {
    audioListener
  };
}
