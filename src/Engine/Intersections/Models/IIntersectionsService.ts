import type { IActorWrapperAsync } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsWatcher } from '@/Engine/Intersections/Models';

export type IIntersectionsService = {
  start: (actors: ReadonlyArray<IActorWrapperAsync>, camera: Readonly<ICameraWrapper>) => IIntersectionsWatcher;
};
