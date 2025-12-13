import type { TMeters } from '@Anarchy/Engine/Math';

import type { TAudioPerformanceOptions } from './TAudioPerformanceOptions';

export type TAudio3dPerformanceOptions = TAudioPerformanceOptions &
  Readonly<{
    noiseThreshold?: TMeters;
  }>;
