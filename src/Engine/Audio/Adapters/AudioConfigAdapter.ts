import { AudioListener, Vector3 } from 'three';

import type { TAudio3dConfig, TAudio3dParams, TAudioConfig, TAudioConfigToParamsDependencies, TAudioParams, TAudioResourceAsyncRegistry } from '@/Engine/Audio/Models';
import { isAudio3dConfig } from '@/Engine/Audio/Utils';
import type { TWriteable } from '@/Engine/Utils';
import { isDefined, isNotDefined } from '@/Engine/Utils';

// TODO 11.0.0: CWP
// TODO 11.0.0: debug
// TODO 11.0.0: we should create not create a new listener every time. Instead we need a single listener (but we need a registry, and use active$ to be able to get it) and get that listener from the registry here via "getActive"
// TODO 11.0.0: Should be possible to add listener to entities via config (so it should use connected transform drive)
const listener = new AudioListener();

export function configToParams(config: TAudioConfig, { audioResourceAsyncRegistry }: TAudioConfigToParamsDependencies): TAudioParams {
  const { position, ...rest } = config as TAudio3dConfig;

  const result: TAudioParams = {
    ...rest,
    listener,
    // TODO 11.0.0: do we need rotation and scale (actually no, but transform drive might need it)
    // ...configToParamsObject3d({ position }),
    audioSource: getAudio(config, audioResourceAsyncRegistry)
  };

  if (isAudio3dConfig(config)) {
    // eslint-disable-next-line functional/immutable-data
    (result as TWriteable<TAudio3dParams>).position = new Vector3(position.x, position.y);
    return result;
  }

  return result;
}

function getAudio(config: TAudioConfig, audioResourceAsyncRegistry: TAudioResourceAsyncRegistry): AudioBuffer | never {
  const audio: AudioBuffer | undefined = isDefined(config.audioSource) ? audioResourceAsyncRegistry.findByKey(config.audioSource) : undefined;
  if (isNotDefined(audio)) throw new Error(`AudioConfigAdapter: audioSource not found: ${config.audioSource}`);
  return audio;
}
