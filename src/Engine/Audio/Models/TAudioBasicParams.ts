import type { TWithNameOptional, TWithTags } from '@/Engine/Mixins';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

import type { TAudioPerformanceOptions } from './TAudioPerformanceOptions';

export type TAudioBasicParams = Readonly<{
  sound: Howl;
  volume: number;
  name: string;
  performance?: TAudioPerformanceOptions;
}> &
  TWithTransformAgentParam &
  TWithNameOptional &
  TWithTags;
