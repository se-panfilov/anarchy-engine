import { PositionalAudio } from 'three';

import type { TAudio3dConfig, TAudio3dParams, TAudioConfig, TAudioParams } from '@/Engine/Audio/Models';
import { isNotDefined } from '@/Engine/Utils';

export const isAudio3dConfig = (config: TAudioConfig | TAudio3dConfig): config is TAudio3dConfig => (config as TAudio3dConfig).position !== undefined;
export const isAudio3dParams = (config: TAudioParams | TAudio3dParams): config is TAudio3dParams => (config as TAudio3dParams).position !== undefined;

export function seekAudio(entity: PositionalAudio, time: number): void {
  if (!entity.buffer) return;
  entity.stop();
  // eslint-disable-next-line functional/immutable-data
  entity.offset = time;
  entity.play();
}

export function createPositionalAudion(audioSource: AudioBuffer, params: TAudioParams): PositionalAudio | never {
  if (isNotDefined(params.listener)) throw new Error('Audio: cannot create positional audio without a listener');
  const positionalAudio = new PositionalAudio(params.listener);

  positionalAudio.setBuffer(audioSource!);
  positionalAudio.setRefDistance(params.refDistance ?? 1);
  positionalAudio.setVolume(params.volume ?? 1);
  if (params.rolloffFactor) positionalAudio.setRolloffFactor(params.rolloffFactor);
  positionalAudio.setDistanceModel(params.distanceModel ?? 'linear');
  if (params.maxDistance) positionalAudio.setMaxDistance(params.maxDistance);
  if (params.directionalCone) positionalAudio.setDirectionalCone(params.directionalCone.x, params.directionalCone.y, params.directionalCone.z);
  return positionalAudio;
}
