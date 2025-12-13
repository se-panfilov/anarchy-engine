import { Raycaster, Vector3 } from 'three';
import { Object3D } from 'three/src/core/Object3D';
import type { CameraWrapper } from '@Engine/Wrappers';
import { getNormalizedMousePosition } from '@Engine/Utils/lib/Mouse';
import type { MousePosition } from '@Engine/Models';
import { isNotDefined } from '@Engine/Utils';

export interface IntersectionsService {
  readonly getIntersection: (
    position: MousePosition,
    cameraWrapper: ReturnType<typeof CameraWrapper>,
    obj: ReadonlyArray<Object3D>
  ) => Vector3 | undefined | never;
  readonly destroy: () => void;
  readonly reset: () => void;
}
export function IntersectionsService(): IntersectionsService {
  let raycaster: Raycaster | undefined = new Raycaster();

  function getIntersection(
    position: MousePosition,
    cameraWrapper: ReturnType<typeof CameraWrapper>,
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
