import type { Observable } from 'rxjs';
import type { Vector3 } from 'three';

export type TWithReactivePosition = Readonly<{ value$: Observable<Vector3>; update: (priority: TSpatialUpdatePriority) => void }>;
