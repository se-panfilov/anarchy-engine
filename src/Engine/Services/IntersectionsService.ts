import type { IDestroyable, IMousePosition, ISceneObject } from '@Engine/Models';
import { getNormalizedMousePosition, isNotDefined, unWrapEntities } from '@Engine/Utils';
import type { IActorWrapper, ICameraWrapper, IVector3 } from '@Engine/Wrappers';
import { Raycaster } from 'three';

export type IIntersectionsService = Readonly<{
  getIntersection: (position: IMousePosition, cameraWrapper: ICameraWrapper, actors: ReadonlyArray<IActorWrapper>) => IVector3 | undefined | never;
  reset: () => void;
}> &
  IDestroyable;

export function IntersectionsService(): IIntersectionsService {
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();

  function getIntersection(position: IMousePosition, cameraWrapper: ICameraWrapper, actors: ReadonlyArray<IActorWrapper>): IVector3 | undefined | never {
    if (isNotDefined(raycaster)) throw new Error('Intersections service: cannot get intersection: a raycaster is not defined.');
    raycaster.setFromCamera(getNormalizedMousePosition(position), cameraWrapper.entity);
    const entitiesList: ReadonlyArray<ISceneObject> = unWrapEntities(actors);
    const intersectObj = raycaster.intersectObjects([...entitiesList])[0];
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
