import type { AudioListener, Vector3Like } from 'three';

import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

import type { TAudioPerformanceOptions } from './TAudioPerformanceOptions';

export type TAudioParams = Readonly<{
  audioSource: AudioBuffer;
  listener?: AudioListener;
  name: string;
  volume?: number;
  loop?: boolean;
  speed?: number;
  seek?: number;
  pause?: boolean;
  refDistance?: number;
  rolloffFactor?: number;
  distanceModel?: 'linear' | 'inverse' | 'exponential';
  maxDistance?: number;
  directionalCone?: Vector3Like;
  performance?: TAudioPerformanceOptions;
}> &
  TWithTransformAgentParam &
  TWithName &
  TWithTags;
