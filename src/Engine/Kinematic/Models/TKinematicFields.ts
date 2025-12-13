import type { Observable } from 'rxjs';
import type { Euler, Quaternion, Vector3 } from 'three';

import type { TDestroyable } from '@/Engine/Mixins';

import type { TKinematicData } from './TKinematicData';
import type { TKinematicMethods } from './TKinematicMethods';

export type TKinematicFields = {
  data: TKinematicData;
  position$: Observable<Vector3>;
  rotationQuaternion$: Observable<Quaternion>;
  rotationEuler$: Observable<Euler>;
} & TKinematicMethods &
  TDestroyable;
