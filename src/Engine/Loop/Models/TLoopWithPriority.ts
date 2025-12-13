import type { BehaviorSubject } from 'rxjs';

import type { TLoop } from './TLoop';

export type TLoopWithPriority = TLoop &
  Readonly<{
    priority$: BehaviorSubject<number>;
  }>;
