import type { IWatcher } from '@/Engine/Abstract';
import type { IActorWrapper } from '@/Engine/Actor';
import type { ICameraWrapper } from '@/Engine/Camera';
import type { IVector3 } from '@/Engine/Vector';

export type IIntersectionsWatcher = Omit<IWatcher<IVector3>, 'start' | 'stop'> &
  Readonly<{
    start: (actors: ReadonlyArray<IActorWrapper>, camera: Readonly<ICameraWrapper>) => IIntersectionsWatcher;
    stop: () => IIntersectionsWatcher;
  }>;
