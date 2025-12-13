import type { AudioListener } from 'three';
import { Vector3 } from 'three';

import type { TCameraConfig, TCameraParams, TCameraServiceDependencies } from '@/Engine/Camera/Models';
import { configToParamsObject3d } from '@/Engine/ThreeLib';

export function configToParams(config: TCameraConfig, { audioService }: TCameraServiceDependencies): TCameraParams {
  const { position, rotation, scale, layers, lookAt, audioListener, ...rest } = config;

  const listener: AudioListener | undefined = audioListener ? audioService.getListenersRegistry().findByKey(audioListener) : undefined;

  return {
    ...rest,
    audioListener: listener,
    ...configToParamsObject3d({ position, rotation, scale, layers }),
    lookAt: lookAt ? new Vector3(lookAt.x, lookAt.y, lookAt.z) : undefined
  };
}
