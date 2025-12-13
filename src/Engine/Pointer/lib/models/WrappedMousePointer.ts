import type { Entity } from '@/Engine/Models';
import { BehaviorSubject, Subject } from 'rxjs';
import type { MousePosition } from './MousePosition';
import type { WrappedCamera } from '@Engine/Camera/Models/WrappedCamera';
import { Object3D } from 'three/src/core/Object3D';
import type { WrappedIntersectionPointer } from '@Engine/Pointer/lib/models/WrappedIntersectionPointer';

export interface WrappedMousePointer extends Entity {
  readonly position$: BehaviorSubject<MousePosition>;
  readonly click$: Subject<{ readonly position: MousePosition; event: MouseEvent }>;
  readonly addIntersectionPointer: (camera: WrappedCamera, obj: ReadonlyArray<Object3D>) => WrappedIntersectionPointer;
}
