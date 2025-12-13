import { BehaviorSubject, Subject } from 'rxjs';
import { Raycaster, Vector3 } from 'three';
import { getNormalizedMousePosition } from "../Utils/lib/Mouse'";
import type { MousePosition } from '../Models/MousePosition';
import { Object3D } from 'three/src/core/Object3D';
import { AbstractWrapper } from '@Engine/Wrappers/AbstractWrapper';
import type { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import type { MousePointerWrapper } from '@Engine/Wrappers/MousePointerWrapper';

export class IntersectionPointerWrapper extends AbstractWrapper<WrappedIntersectionPointer> {
  public position$: BehaviorSubject<Vector3>;
  public click$: Subject<{ readonly event: MouseEvent }>;
  public raycaster: Raycaster;

  constructor(
    mousePointer: Pick<MousePointerWrapper, 'position$' | 'click$' | 'destroyed$'>,
    cameraWrapper: CameraWrapper,
    obj: ReadonlyArray<Object3D>
  ) {
    super();
    this.position$ = new BehaviorSubject<Vector3>(new Vector3());
    this.click$ = new Subject<{ readonly event: MouseEvent }>();
    this.raycaster = new Raycaster();

    mousePointer.position$.subscribe((position: MousePosition) => {
      this.raycaster.setFromCamera(getNormalizedMousePosition(position), cameraWrapper.entity);
      const intersectObj = this.raycaster.intersectObjects([...obj])[0];
      if (intersectObj) this.position$.next(intersectObj.point);
    });

    mousePointer.click$.subscribe(({ event }) => this.click$.next({ event }));
    mousePointer.destroyed$.subscribe(() => this.destroy());

    this.destroyed$.subscribe(() => {
      mousePointer.position$.unsubscribe();
      this.position$.complete();
      this.click$.complete();
      this.raycaster = undefined as any;
    });
  }
}
