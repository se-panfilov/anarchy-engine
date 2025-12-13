import { PositionalAudio } from 'three';

import type { TAudio3dConfig, TAudio3dParams, TAudioConfig, TAudioFadeParams, TAudioParams } from '@/Engine/Audio/Models';

export const isAudio3dConfig = (config: TAudioConfig | TAudio3dConfig): config is TAudio3dConfig => (config as TAudio3dConfig).position !== undefined;
export const isAudio3dParams = (config: TAudioParams | TAudio3dParams): config is TAudio3dParams => (config as TAudio3dParams).position !== undefined;

// TODO 11.0.0: implement pauseAudio
export function pauseAudio(entity: PositionalAudio): void {
  console.warn('pauseAudio is not implemented yet');
  // if (!entity.isPlaying) return;
  // entity.pausedAt = entity.context.currentTime - entity.startTime;
  // entity.stop();
  // entity.isPaused = true;
}

// TODO 11.0.0: implement resumeAudio
export function resumeAudio(entity: PositionalAudio): void {
  console.warn('resumeAudio is not implemented yet');
  // if (!entity.isPaused || entity.pausedAt === null) return;
  // entity.offset = entity.pausedAt;
  // entity.play();
  // entity.isPaused = false;
  // entity.pausedAt = null;
}

// TODO 11.0.0: fadeAudio if seekAudio is working
export function fadeAudio(audio: PositionalAudio, { to, duration }: TAudioFadeParams): void {
  const gainNode = audio.gain;
  gainNode.gain.cancelScheduledValues(audio.context.currentTime);
  gainNode.gain.setValueAtTime(gainNode.gain.value, audio.context.currentTime);
  gainNode.gain.linearRampToValueAtTime(to, audio.context.currentTime + duration);
}

// TODO 11.0.0: check if seekAudio is working
export function seekAudio(entity: PositionalAudio, time: number): void {
  if (!entity.buffer) return;
  entity.stop();
  // eslint-disable-next-line functional/immutable-data
  entity.offset = time;
  entity.play();
}

export function createPositionalAudion(audioSource: AudioBuffer, params: TAudioParams): PositionalAudio {
  const positionalAudio = new PositionalAudio(params.listener);

  positionalAudio.setBuffer(audioSource!);
  positionalAudio.setRefDistance(params.refDistance ?? 1);
  positionalAudio.setVolume(params.volume);
  if (params.rolloffFactor) positionalAudio.setRolloffFactor(params.rolloffFactor);
  positionalAudio.setDistanceModel(params.distanceModel ?? 'linear');
  if (params.maxDistance) positionalAudio.setMaxDistance(params.maxDistance);
  if (params.directionalCone) positionalAudio.setDirectionalCone(params.directionalCone.x, params.directionalCone.y, params.directionalCone.z);
  return positionalAudio;
}
