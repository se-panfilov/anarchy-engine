import type { AudioListener } from 'three';
import { Vector3 } from 'three';

import type { TCameraConfig, TCameraParams, TCameraServiceDependencies } from '@/Engine/Camera/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TCameraConfig, { audioService }: TCameraServiceDependencies): TCameraParams | never {
  const { position, rotation, scale, layers, lookAt, audioListener, ...rest } = config;

  let listener: AudioListener | undefined;
  if (isDefined(audioListener)) {
    listener = audioService.getListenersRegistry().findByKey(audioListener);
    if (isNotDefined(listener)) throw new Error(`Camera: cannot create camera from config: listener ("${audioListener}") is not found`);
  }

  return {
    ...rest,
    audioListener: listener,
    ...configToParamsObject3d({ position, rotation, scale, layers }),
    lookAt: lookAt ? new Vector3(lookAt.x, lookAt.y, lookAt.z) : undefined
  };
}
