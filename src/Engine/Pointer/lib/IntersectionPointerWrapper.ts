import { BehaviorSubject, Subject } from 'rxjs';
import { Raycaster, Vector3 } from 'three';
import { getNormalizedMousePosition } from './utils/utils';
import type { MousePosition } from './models/MousePosition';
import { Object3D } from 'three/src/core/Object3D';
import { nanoid } from 'nanoid';
import type { WrappedIntersectionPointer } from './models/WrappedIntersectionPointer';
import type { WrappedCamera } from '@Engine/Camera/Models/WrappedCamera';
import type { WrappedMousePointer } from '@Engine/Pointer/lib/models/WrappedMousePointer';

export function IntersectionPointerWrapper(
  mousePointer: Pick<WrappedMousePointer, 'position$' | 'click$' | 'destroyed$'>,
  camera: WrappedCamera,
  obj: ReadonlyArray<Object3D>
): WrappedIntersectionPointer {
  const position$ = new BehaviorSubject<Vector3>(new Vector3());
  const click$ = new Subject<{ readonly position: Vector3; readonly event: MouseEvent }>();
  const destroyed$ = new Subject<void>();

  const raycaster = new Raycaster();

  mousePointer.position$.subscribe((position: MousePosition) => {
    raycaster.setFromCamera(getNormalizedMousePosition(position), camera.camera);
    const intersectObj = raycaster.intersectObjects([...obj])[0];
    if (intersectObj) position$.next(intersectObj.point);
  });

  mousePointer.click$.subscribe(({ event }) => click$.next({ position: position$.value, event }));
  mousePointer.destroyed$.subscribe(() => destroy());

  function destroy() {
    mousePointer.position$.unsubscribe();
    position$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `intersection_pointer_${nanoid()}`, click$, position$, raycaster, destroy, destroyed$ };
}
