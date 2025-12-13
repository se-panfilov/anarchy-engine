import type { IGlobalContainerDecorator, IIntersectionsWatcher } from '@/Engine';

export type IIntersectionsWatcherFactory = {
  create: (container: IGlobalContainerDecorator, tags?: ReadonlyArray<string>) => IIntersectionsWatcher;
};
