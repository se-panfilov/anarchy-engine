import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsWatcher } from '@/Engine/Intersections/Models';

export type IIntersectionsService = {
  buildWatcher: (camera: Readonly<ICameraWrapper>) => IIntersectionsWatcher;
  addActorsToWatcher: (watcherId: string, actors: ReadonlyArray<IActorWrapperAsync>) => void;
  start: (watcherId: string) => IIntersectionsWatcher;
};
