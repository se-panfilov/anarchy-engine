import { Entity } from '@/Models';
import { BehaviorSubject, Subject } from 'rxjs';
import { Raycaster, Vector3 } from 'three';
import { WrappedMousePointer } from './WrappedMousePointer';

export interface WrappedIntersectionPointer extends Entity {
  readonly position$: BehaviorSubject<Vector3>;
  readonly click$: Subject<{ readonly position: Vector3; readonly event: MouseEvent }>;
  readonly mousePointer: WrappedMousePointer;
  readonly raycaster: Raycaster;
}
