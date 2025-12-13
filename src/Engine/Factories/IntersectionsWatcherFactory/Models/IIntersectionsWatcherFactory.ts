import type { IActorWrapper, ICameraWrapper, IIntersectionsWatcher, IMousePositionWatcher } from '@/Engine';

export type IIntersectionsWatcherFactory = {
  create: (actors: ReadonlyArray<IActorWrapper>, camera: Readonly<ICameraWrapper>, positionWatcher: Readonly<IMousePositionWatcher>, tags?: ReadonlyArray<string>) => IIntersectionsWatcher;
};
