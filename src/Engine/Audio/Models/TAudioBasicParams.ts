import type { TWithName } from '@/Engine/Mixins';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

import type { TAudioPerformanceOptions } from './TAudioPerformanceOptions';

export type TAudioBasicParams = Readonly<{
  audioSource: AudioBuffer;
  volume: number;
  name: string;
  loop?: boolean;
  speed?: number;
  seek?: number;
  pause?: boolean;
  mute?: boolean;
  performance?: TAudioPerformanceOptions;
}> &
  TWithTransformAgentParam &
  TWithName;
