import type { TAudioParams, TAudioWrapper } from '@/Audio/Models';
import { createAudio } from '@/Audio/Utils';
import { AbstractAudioWrapper } from '@/Audio/Wrappers/AbstractAudioWrapper';

export function AudioWrapper(params: TAudioParams): TAudioWrapper {
  return AbstractAudioWrapper(params, createAudio);
}
