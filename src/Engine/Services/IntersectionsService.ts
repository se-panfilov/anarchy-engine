import { getNormalizedMousePosition, isNotDefined } from '@Engine/Utils';
import type { IMousePosition, IVector3 } from '@Engine/Models';
import { Raycaster } from 'three';
import type { ICameraWrapper } from '@Engine/Wrappers';
import { Object3D } from 'three/src/core/Object3D';

export type IntersectionsService = Readonly<{
  getIntersection: (
    position: IMousePosition,
    cameraWrapper: ICameraWrapper,
    obj: ReadonlyArray<Object3D>
  ) => IVector3 | undefined | never;
  destroy: () => void;
  reset: () => void;
}>;

export function IntersectionsService(): IntersectionsService {
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();

  function getIntersection(
    position: IMousePosition,
    cameraWrapper: ICameraWrapper,
    obj: ReadonlyArray<Object3D>
  ): IVector3 | undefined | never {
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
