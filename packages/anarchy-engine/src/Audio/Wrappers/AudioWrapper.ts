import type { TAudioParams, TAudioWrapper } from '@Anarchy/Engine/Audio/Models';
import { createAudio } from '@Anarchy/Engine/Audio/Utils';
import { AbstractAudioWrapper } from '@Anarchy/Engine/Audio/Wrappers/AbstractAudioWrapper';

export function AudioWrapper(params: TAudioParams): TAudioWrapper {
  return AbstractAudioWrapper(params, createAudio);
}
