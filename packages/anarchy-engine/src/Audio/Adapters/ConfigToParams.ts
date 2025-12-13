import { Listeners } from '@Engine/Audio/Constants';
import type { TAnyAudioConfig, TAnyAudioParams, TAudio3dConfig, TAudio3dParams, TAudioConfigToParamsDependencies, TAudioResourceAsyncRegistry } from '@Engine/Audio/Models';
import { isAudio3dConfig } from '@Engine/Audio/Utils';
import type { TWriteable } from '@Shared/Utils';
import { Vector3 } from 'three';

export function configToParams(config: TAnyAudioConfig, { audioResourceAsyncRegistry, audioListenersRegistry }: TAudioConfigToParamsDependencies): TAnyAudioParams {
  const { position, ...rest } = config as TAudio3dConfig;

  const result: TAnyAudioParams = {
    ...rest,
    listener: audioListenersRegistry.findByKey(config.listener ?? Listeners.Main),
    audioSource: getAudio(config, audioResourceAsyncRegistry)
  };

  if (isAudio3dConfig(config)) {
    // eslint-disable-next-line functional/immutable-data
    (result as TWriteable<TAudio3dParams>).position = new Vector3(position.x, position.y);
    return result;
  }

  return result;
}

function getAudio(config: TAnyAudioConfig, audioResourceAsyncRegistry: TAudioResourceAsyncRegistry): AudioBuffer {
  return audioResourceAsyncRegistry.getByKey(config.audioSource);
}
