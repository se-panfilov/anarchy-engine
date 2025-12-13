import type { TAudioBasicParams, TAudioWrapper } from '@/Engine/Audio/Models';
import { createAudio } from '@/Engine/Audio/Utils';
import { AbstractAudioWrapper } from '@/Engine/Audio/Wrappers/AbstractAudioWrapper';

export function AudioWrapper(params: TAudioBasicParams): TAudioWrapper {
  return AbstractAudioWrapper(params, createAudio);
}
