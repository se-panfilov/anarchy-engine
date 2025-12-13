import type { Observable } from 'rxjs';
import type { Euler, Quaternion, Vector3 } from 'three';

export type TKinematicData = Readonly<{
  linearSpeed: number;
  linearDirection: Vector3;
  angularSpeed: number;
  angularDirection: Vector3;
  position$: Observable<Vector3>;
  rotationQuaternion$: Observable<Quaternion>;
  rotationEuler$: Observable<Euler>;
}>;
