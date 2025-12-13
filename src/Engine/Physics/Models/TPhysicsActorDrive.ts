import type { Observable } from 'rxjs';
import type { Euler, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';

export type TPhysicsActorDrive = Readonly<{
  position$: Observable<Vector3>;
  rotation$: Observable<Euler>;
  scale$: Observable<Vector3 | undefined>;
}> &
  TDestroyable;
