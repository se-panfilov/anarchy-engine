import type { Observable } from 'rxjs';
import type { Euler } from 'three';

import type { SpatialUpdatePriority } from '@/Engine/Spatial';

export type TWithReactiveRotation = Readonly<{ value$: Observable<Euler>; update: (priority: SpatialUpdatePriority) => void }>;
