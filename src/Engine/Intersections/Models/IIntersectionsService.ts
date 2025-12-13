import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsWatcher } from '@/Engine/Intersections/Models';
import type { IDestroyable } from '@/Engine/Mixins';

export type IIntersectionsService = Readonly<{
  buildWatcher: (camera: Readonly<ICameraWrapper>) => IIntersectionsWatcher;
  addActorsToWatcher: (watcherId: string, actors: ReadonlyArray<IActorWrapperAsync>) => void;
  start: (watcherId: string) => IIntersectionsWatcher;
}> &
  IDestroyable;
