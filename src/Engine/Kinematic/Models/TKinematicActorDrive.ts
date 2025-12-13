import type { Observable } from 'rxjs';
import type { Euler, Quaternion, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TKinematicData } from './TKinematicData';
import type { TKinematicMethods } from './TKinematicMethods';

export type TKinematicActorDrive = {
  data: TKinematicData;
  position$: Observable<Vector3>;
  rotationQuaternion$: Observable<Quaternion>;
  rotation$: Observable<Euler>;
  scale$: Observable<Vector3 | undefined>;
} & TKinematicMethods &
  TDestroyable;
