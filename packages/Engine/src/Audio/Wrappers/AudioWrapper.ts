import type { TAudioParams, TAudioWrapper } from '@/Engine/Audio/Models';
import { createAudio } from '@/Engine/Audio/Utils';
import { AbstractAudioWrapper } from '@/Engine/Audio/Wrappers/AbstractAudioWrapper';

export function AudioWrapper(params: TAudioParams): TAudioWrapper {
  return AbstractAudioWrapper(params, createAudio);
}
