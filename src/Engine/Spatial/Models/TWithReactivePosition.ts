import type { Observable } from 'rxjs';
import type { Vector3 } from 'three';

import type { SpatialUpdatePriority } from '@/Engine/Spatial';

export type TWithReactivePosition = Readonly<{ value$: Observable<Vector3>; update: (priority: SpatialUpdatePriority) => void }>;
