import type { Observable } from 'rxjs';
import type { Euler } from 'three';

export type TWithReactiveRotation = Readonly<{ value$: Observable<Euler>; update: (priority: TSpatialUpdatePriority) => void }>;
