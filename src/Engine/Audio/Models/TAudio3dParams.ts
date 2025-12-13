import type { TWithNameOptional, TWithTags } from '@/Engine/Mixins';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

import type { TAudioPerformanceOptions } from './TAudioPerformanceOptions';

export type TAudio3dParams = Readonly<{
  sound: Howl;
  volume: number;
  position: TReadonlyVector3;
  name: string;
  performance?: TAudioPerformanceOptions;
}> &
  TWithTransformAgentParam &
  TWithNameOptional &
  TWithTags;
