import type { BehaviorSubject } from 'rxjs';

import type { CollisionsUpdatePriority } from '@/Engine/Collisions/Constants';
import type { TLoop } from '@/Engine/Loop/Models';

export type TCollisionsLoop = TLoop &
  Readonly<{
    priority$: BehaviorSubject<CollisionsUpdatePriority>;
  }>;
