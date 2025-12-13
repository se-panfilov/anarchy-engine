import type { BehaviorSubject } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';

export type TAbstractDriver = Readonly<{
  position$: BehaviorSubject<Vector3>;
  rotation$: BehaviorSubject<Euler>;
  scale$: BehaviorSubject<Vector3 | undefined>;
}> &
  TDestroyable;
