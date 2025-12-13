import { BehaviorSubject, Subject } from 'rxjs';
import { Camera, Raycaster, Vector3 } from 'three';
import { getNormalizedMousePosition } from './utils/utils';
import { MousePointer } from './MousePointer';
import { MousePosition } from './models/MousePosition';
import { Object3D } from 'three/src/core/Object3D';

export function IntersectionPointer(
  mousePointer: ReturnType<typeof MousePointer>,
  camera: Camera,
  obj: Array<Object3D>
) {
  const position$ = new BehaviorSubject<Vector3>(new Vector3());
  const click$ = new Subject<{ readonly position: Vector3; readonly event: MouseEvent }>();

  const raycaster = new Raycaster();

  mousePointer.position$.subscribe((position: MousePosition) => {
    raycaster.setFromCamera(getNormalizedMousePosition(position), camera);
    const intersectObj = raycaster.intersectObjects(obj)[0];
    if (intersectObj) position$.next(intersectObj.point);
  });

  mousePointer.click$.subscribe(({ event }) => click$.next({ position: position$.value, event }));

  function destroy() {
    mousePointer.position$.unsubscribe();
    position$.complete();
  }

  return { click$, position$, mousePointer, raycaster, destroy };
}
