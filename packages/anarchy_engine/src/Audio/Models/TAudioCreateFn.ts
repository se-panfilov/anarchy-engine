import type { TAnyAudio } from './TAnyAudio';
import type { TAnyAudioParams } from './TAnyAudioParams';

export type TAudioCreateFn<T extends TAnyAudio> = (audio: AudioBuffer, params: TAnyAudioParams) => T;
