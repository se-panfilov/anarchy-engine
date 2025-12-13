import type { Subject } from 'rxjs';
import type { Euler } from 'three';

import type { SpatialUpdatePriority } from '@/Engine/Spatial';

export type TWithReactiveRotation = Readonly<{ value$: Subject<Euler>; update: (priority: SpatialUpdatePriority) => void }>;
