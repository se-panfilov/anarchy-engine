import { BehaviorSubject, Subject } from 'rxjs';
import { MousePosition } from './models/MousePosition';
import { nanoid } from 'nanoid';
import { WrappedMousePointer } from './models/WrappedMousePointer';

export function MousePointer(): WrappedMousePointer {
  const position$ = new BehaviorSubject<MousePosition>({ x: 0, y: 0 });
  const click$ = new Subject<{ readonly position: MousePosition; readonly event: MouseEvent }>();
  const destroyed$ = new Subject<void>();
  // let isHeld = false;

  const onMouseMoveListener = ({ clientX: x, clientY: y }: MouseEvent) => position$.next({ x, y });
  const onMouseUpListener = (event: MouseEvent) => click$.next({ position: position$.value, event });

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

  return { id: `mouse_pointer_${nanoid()}`, position$, click$, destroy, destroyed$ };
}
