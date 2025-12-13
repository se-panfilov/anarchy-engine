import { getNormalizedMousePosition, isNotDefined } from '@Engine/Utils';
import { Raycaster, Vector3 } from 'three';
import type { ICameraWrapper } from '@Engine/Wrappers';
import type { IMousePosition } from '@Engine/Models';
import { Object3D } from 'three/src/core/Object3D';

export interface IntersectionsService {
  readonly getIntersection: (
    position: IMousePosition,
    cameraWrapper: ICameraWrapper,
    obj: ReadonlyArray<Object3D>
  ) => Vector3 | undefined | never;
  readonly destroy: () => void;
  readonly reset: () => void;
}
export function IntersectionsService(): IntersectionsService {
  let raycaster: Raycaster | undefined = new Raycaster();

  function getIntersection(
    position: IMousePosition,
    cameraWrapper: ICameraWrapper,
    obj: ReadonlyArray<Object3D>
  ): Vector3 | undefined | never {
    if (isNotDefined(raycaster))
      throw new Error('Intersections service: cannot get intersection: a raycaster is not defined.');
    raycaster.setFromCamera(getNormalizedMousePosition(position), cameraWrapper.entity);
    const intersectObj = raycaster.intersectObjects([...obj])[0];
    return intersectObj ? intersectObj.point : undefined;
  }

  function destroy(): void {
    raycaster = undefined;
  }

  function reset(): void {
    raycaster = new Raycaster();
  }

  return { getIntersection, reset, destroy };
}
