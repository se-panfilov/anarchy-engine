import type { IDestroyable, IMousePosition, ISceneObject } from '@Engine/Models';
import { getNormalizedMousePosition, isNotDefined, unWrapEntities } from '@Engine/Utils';
import type { IActorWrapper, ICameraWrapper, IVector3 } from '@Engine/Wrappers';
import { Raycaster } from 'three';

import type { IMouseClicksWatcher, IMousePositionWatcher } from '@/Engine/Watchers';

// TODO (S.Panfilov) extract?
export type IIntersectionsService = Readonly<{
  getWatcher: (actors: ReadonlyArray<IActorWrapper>, camera: ICameraWrapper, positionWatcher: IMousePositionWatcher, clickWatcher: IMouseClicksWatcher) => IIntersectionsWatcher;
}>;

// TODO (S.Panfilov) extract
export type IIntersectionsWatcher = Readonly<{
  onIntersect: (cb: (obj: IVector3) => void) => void;
  reset: () => void;
}> &
  IDestroyable;

// TODO (S.Panfilov) should be IFactory
export function IntersectionsService(): IIntersectionsService {
  // TODO (S.Panfilov) add to registry?
  function getWatcher(actors: ReadonlyArray<IActorWrapper>, camera: ICameraWrapper, positionWatcher: IMousePositionWatcher): IIntersectionsWatcher {
    return IntersectionsWatcher(actors, camera, positionWatcher);
  }

  return { getWatcher };
}

// TODO (S.Panfilov) should be IWatcher
function IntersectionsWatcher(actors: ReadonlyArray<IActorWrapper>, camera: Readonly<ICameraWrapper>, positionWatcher: Readonly<IMousePositionWatcher>): IIntersectionsWatcher {
  let raycaster: Readonly<Raycaster> | undefined = new Raycaster();
  let onIntersectCB: (obj: IVector3) => void;

  positionWatcher.value$.subscribe((position: IMousePosition): void => {
    const obj: IVector3 | undefined = getIntersection(position, camera, actors);
    if (obj) onIntersectCB(obj);
  });

  function onIntersect(cb: (obj: IVector3) => void): void {
    onIntersectCB = cb;
  }

  function getIntersection(position: IMousePosition, cameraWrapper: Readonly<ICameraWrapper>, actors: ReadonlyArray<IActorWrapper>): IVector3 | undefined | never {
    if (isNotDefined(raycaster)) throw new Error('Intersections service: cannot get intersection: a raycaster is not defined.');
    raycaster.setFromCamera(getNormalizedMousePosition(position), cameraWrapper.entity);
    const entitiesList: ReadonlyArray<ISceneObject> = unWrapEntities(actors);
    const intersectObj = raycaster.intersectObjects([...entitiesList])[0];
    return intersectObj ? intersectObj.point : undefined;
  }

  function destroy(): void {
    raycaster = undefined;
    positionWatcher.value$.unsubscribe();
  }

  function reset(): void {
    raycaster = new Raycaster();
  }

  return { onIntersect, destroy, reset };
}
