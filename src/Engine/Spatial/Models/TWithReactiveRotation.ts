import type { Subject } from 'rxjs';
import type { Euler } from 'three';

export type TWithReactiveRotation = Readonly<{ value$: Subject<Euler>; update: () => void }>;
