import type { TReadonlyVector3 } from '@Anarchy/Engine/ThreeLib';

import type { TAudio3dPerformanceOptions } from './TAudio3dPerformanceOptions';
import type { TAudioParams } from './TAudioParams';

export type TAudio3dParams = Omit<TAudioParams, 'performance'> &
  Readonly<{
    performance?: TAudio3dPerformanceOptions;
    position: TReadonlyVector3;
  }>;
