import { Entity } from '../../../Models';
import { BehaviorSubject, Subject } from 'rxjs';
import { MousePosition } from './MousePosition';

export interface WrappedMousePointer extends Entity {
  readonly position$: BehaviorSubject<MousePosition>;
  readonly click$: Subject<{ readonly position: MousePosition; event: MouseEvent }>;
}
