import { BehaviorSubject, Subject } from 'rxjs';
import type { MousePosition } from './models/MousePosition';
import { nanoid } from 'nanoid';
import type { WrappedMousePointer } from './models/WrappedMousePointer';
import { IntersectionPointerWrapper } from '@Engine/Pointer';
import type { WrappedCamera } from '@Engine/Camera/Models/WrappedCamera';
import { Object3D } from 'three/src/core/Object3D';

export function MousePointerWrapper(): WrappedMousePointer {
  const position$ = new BehaviorSubject<MousePosition>({ x: 0, y: 0 });
  const click$ = new Subject<{ readonly position: MousePosition; readonly event: MouseEvent }>();
  const destroyed$ = new Subject<void>();

  const onMouseMoveListener = ({ clientX: x, clientY: y }: MouseEvent) => position$.next({ x, y });
  const onMouseUpListener = (event: MouseEvent) => click$.next({ position: position$.value, event });
  const addIntersectionPointer = (camera: WrappedCamera, obj: ReadonlyArray<Object3D>) =>
    IntersectionPointerWrapper(
      {
        position$,
        click$,
        destroyed$
      },
      camera,
      obj
    );

  // TODO (S.Panfilov) global?
  document.addEventListener('mousemove', onMouseMoveListener);
  // TODO (S.Panfilov) global?
  document.addEventListener('mouseup', onMouseUpListener);

  function destroy() {
    // TODO (S.Panfilov) global?
    document.removeEventListener('mousemove', onMouseMoveListener);
    // TODO (S.Panfilov) global?
    document.removeEventListener('mouseup', onMouseUpListener);
    position$.complete();
    click$.complete();
    destroyed$.next();
    destroyed$.complete();
  }

  return { id: `mouse_pointer_${nanoid()}`, position$, click$, addIntersectionPointer, destroy, destroyed$ };
}
