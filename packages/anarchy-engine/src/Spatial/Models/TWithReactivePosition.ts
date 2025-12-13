import type { Subject } from 'rxjs';
import type { Vector3 } from 'three';

export type TWithReactivePosition = Readonly<{ value$: Subject<Vector3>; update: () => void }>;
