import type { TAudioParams, TAudioWrapper } from '@hellpig/anarchy-engine/Audio/Models';
import { createAudio } from '@hellpig/anarchy-engine/Audio/Utils';
import { AbstractAudioWrapper } from '@hellpig/anarchy-engine/Audio/Wrappers/AbstractAudioWrapper';

export function AudioWrapper(params: TAudioParams): TAudioWrapper {
  return AbstractAudioWrapper(params, createAudio);
}
