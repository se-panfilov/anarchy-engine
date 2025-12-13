import { Audio, PositionalAudio } from 'three';

import type { TAnyAudio, TAnyAudioConfig, TAnyAudioParams, TAudio3dConfig, TAudio3dParams, TAudioParams } from '@/Engine/Audio/Models';
import { isNotDefined } from '@/Engine/Utils';

export const isAudio3dConfig = (config: TAnyAudioConfig | TAudio3dConfig): config is TAudio3dConfig => (config as TAudio3dConfig).position !== undefined;
export const isAudio3dParams = (config: TAnyAudioParams | TAudio3dParams): config is TAudio3dParams => (config as TAudio3dParams).position !== undefined;

export function seekAudio(entity: TAnyAudio, time: number): void {
  if (!entity.buffer) return;
  entity.stop();
  // eslint-disable-next-line functional/immutable-data
  entity.offset = time;
  entity.play();
}

export function createPositionalAudio(audioSource: AudioBuffer, params: TAudio3dParams): PositionalAudio | never {
  if (isNotDefined(params.listener)) throw new Error('Audio: cannot create positional audio without a listener');
  const audio = new PositionalAudio(params.listener);

  audio.setBuffer(audioSource!);
  audio.setRefDistance(params.refDistance ?? 1);
  audio.setVolume(params.volume ?? 1);
  audio.setLoop(params.loop ?? false);
  if (params.rolloffFactor) audio.setRolloffFactor(params.rolloffFactor);
  audio.setDistanceModel(params.distanceModel ?? 'linear');
  if (params.maxDistance) audio.setMaxDistance(params.maxDistance);
  if (params.directionalCone) audio.setDirectionalCone(params.directionalCone.x, params.directionalCone.y, params.directionalCone.z);
  return audio;
}

export function createAudio(audioSource: AudioBuffer, params: TAudioParams): Audio {
  if (isNotDefined(params.listener)) throw new Error('Audio: cannot create positional audio without a listener');
  const audio = new Audio(params.listener);
  audio.setBuffer(audioSource);
  audio.setLoop(params.loop ?? false);
  audio.setVolume(params.volume ?? 1);
  return audio;
}
