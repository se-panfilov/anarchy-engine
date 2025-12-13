import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsWatcher } from '@/Engine/Intersections/Models';
import type { IActorWrapperAsync } from '@/Engine/Actor';

export type IIntersectionsService = {
  addActorsToWatcher: (watcherId: string, actors: ReadonlyArray<IActorWrapperAsync>) => void;
  start: (camera: Readonly<ICameraWrapper>) => IIntersectionsWatcher;
};
