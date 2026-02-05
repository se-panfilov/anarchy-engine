import type { TMeters } from '@hellpig/anarchy-engine/Math';

import type { TAudioPerformanceOptions } from './TAudioPerformanceOptions';

export type TAudio3dPerformanceOptions = TAudioPerformanceOptions &
  Readonly<{
    noiseThreshold?: TMeters;
  }>;
