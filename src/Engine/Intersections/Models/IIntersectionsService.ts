import type { IActorWrapper } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IIntersectionsWatcher } from '@/Engine/Intersections/Models';

export type IIntersectionsService = {
  start: (actors: ReadonlyArray<IActorWrapper>, camera: Readonly<ICameraWrapper>) => IIntersectionsWatcher;
};
