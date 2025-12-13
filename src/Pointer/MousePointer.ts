import { BehaviorSubject, Subject } from 'rxjs';
import { MousePosition } from './models/MousePosition';

export function MousePointer() {
  const position$ = new BehaviorSubject<MousePosition>({ x: 0, y: 0 });
  const click$ = new Subject<{ readonly position: MousePosition; event: MouseEvent }>();
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
  }

  return { position$, click$, destroy };
}
