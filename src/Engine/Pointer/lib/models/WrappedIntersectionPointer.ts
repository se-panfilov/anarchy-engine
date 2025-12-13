import type { Entity } from '@/Engine/Models';
import { BehaviorSubject, Subject } from 'rxjs';
import { Raycaster, Vector3 } from 'three';

export interface WrappedIntersectionPointer extends Entity {
  readonly position$: BehaviorSubject<Vector3>;
  readonly click$: Subject<{ readonly position: Vector3; readonly event: MouseEvent }>;
  readonly raycaster: Raycaster;
}
