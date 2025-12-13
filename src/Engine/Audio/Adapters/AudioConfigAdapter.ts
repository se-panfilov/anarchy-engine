import { Vector3 } from 'three';

import type { TAudio3dConfig, TAudioConfig, TAudioConfigToParamsDependencies, TAudioParams, TAudioResourceAsyncRegistry } from '@/Engine/Audio/Models';
import { isAudio3dConfig } from '@/Engine/Audio/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

export function configToParams(config: TAudioConfig, { audioResourceAsyncRegistry }: TAudioConfigToParamsDependencies): TAudioParams {
  const { position, ...rest } = config as TAudio3dConfig;

  const result = {
    ...rest,
    // TODO 11.0.0: do we need rotation and scale (actually no, but transform drive might need it)
    // ...configToParamsObject3d({ position }),
    position: isDefined(position) ? new Vector3(position.x, position.y, position.z) : undefined,
    audioSource: getAudio(config, audioResourceAsyncRegistry)
  };

  if (isAudio3dConfig(config)) {
    // eslint-disable-next-line functional/immutable-data
    result.position = isDefined(position) ? new Vector3(position.x, position.y) : undefined;
  }

  return result;
}

function getAudio(config: TAudioConfig, audioResourceAsyncRegistry: TAudioResourceAsyncRegistry): Howl | never {
  const audio: Howl | undefined = isDefined(config.audioSource) ? audioResourceAsyncRegistry.findByKey(config.audioSource) : undefined;
  if (isNotDefined(audio)) throw new Error(`AudioConfigAdapter: audioSource not found: ${config.audioSource}`);
  return audio;
}
