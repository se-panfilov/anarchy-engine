import type { PositionalAudio } from 'three';

import type { TAudio3dConfig, TAudioConfig } from '@/Engine/Audio/Models';

export const isAudio3dConfig = (config: TAudioConfig | TAudio3dConfig): config is TAudio3dConfig => (config as TAudio3dConfig).position !== undefined;

// TODO 11.0.0: implement pauseAudio
export function pauseAudio(entity: AudioBuffer): void {
  console.warn('pauseAudio is not implemented yet');
  // if (!entity.isPlaying) return;
  // entity.pausedAt = entity.context.currentTime - entity.startTime;
  // entity.stop();
  // entity.isPaused = true;
}

// TODO 11.0.0: implement resumeAudio
export function resumeAudio(entity: AudioBuffer): void {
  console.warn('resumeAudio is not implemented yet');
  // if (!entity.isPaused || entity.pausedAt === null) return;
  // entity.offset = entity.pausedAt;
  // entity.play();
  // entity.isPaused = false;
  // entity.pausedAt = null;
}

// TODO 11.0.0: implement fadeAudio
export function fadeAudio(audio: PositionalAudio, toVolume: number, duration: number): void {
  console.warn('fadeAudio is not implemented yet');
  // const gainNode = audio.gain;
  // gainNode.gain.cancelScheduledValues(audio.context.currentTime);
  // gainNode.gain.setValueAtTime(gainNode.gain.value, audio.context.currentTime);
  // gainNode.gain.linearRampToValueAtTime(toVolume, audio.context.currentTime + duration);
}

// TODO 11.0.0: implement seekAudio
export function seekAudio(entity: AudioBuffer, time: number): void {
  console.warn('seekAudio is not implemented yet');
  // if (!entity.buffer) return;
  // entity.stop();
  // entity.offset = time;
  // entity.play();
}
