import type { TWithName } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

import type { TAudioPerformanceOptions } from './TAudioPerformanceOptions';

export type TAudioBasicParams = Readonly<{
  audioSource: Howl;
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
  Pick<TObject3DParams, 'position'> &
  TWithName;
