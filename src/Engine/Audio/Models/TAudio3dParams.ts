import type { TDestroyable } from '@/Engine/Mixins';
import type { TReadonlyVector3 } from '@/Engine/ThreeLib';

import type { TAudioPerformanceOptions } from './TAudioPerformanceOptions';

export type TAudio3dParams = Readonly<{
  sound: Howl;
  volume: number;
  position: TReadonlyVector3;
  name: string;
  performance?: TAudioPerformanceOptions;
}> &
  TDestroyable;
