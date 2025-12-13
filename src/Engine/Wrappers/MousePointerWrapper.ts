import { BehaviorSubject, Subject } from 'rxjs';
import type { MousePosition } from '../Models/MousePosition';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';

// TODO (S.Panfilov) any
export class MousePointerWrapper extends AbstractWrapper<any> {
  public position$ = new BehaviorSubject<MousePosition>({ x: 0, y: 0 });
  public click$ = new Subject<{ readonly position: MousePosition; readonly event: MouseEvent }>();

  private onMouseMoveListener = ({ clientX: x, clientY: y }: MouseEvent): void => this.position$.next({ x, y });
  private onMouseUpListener = (event: MouseEvent): void => this.click$.next({ position: this.position$.value, event });
  // public addIntersectionPointer = (camera: CameraWrapper, obj: ReadonlyArray<Object3D>) =>
  //   new IntersectionPointerWrapper(
  //     {
  //       this.position$,
  //       this.click$,
  //       this.destroyed$
  //     },
  //     camera,
  //     obj
  //   );

  constructor() {
    super();

    // TODO (S.Panfilov) global?
    document.addEventListener('mousemove', this.onMouseMoveListener);
    // TODO (S.Panfilov) global?
    document.addEventListener('mouseup', this.onMouseUpListener);

    this.destroyed$.subscribe(() => {
      // TODO (S.Panfilov) global?
      document.removeEventListener('mousemove', this.onMouseMoveListener);
      // TODO (S.Panfilov) global?
      document.removeEventListener('mouseup', this.onMouseUpListener);
      this.position$.complete();
      this.click$.complete();
    });
  }
}
