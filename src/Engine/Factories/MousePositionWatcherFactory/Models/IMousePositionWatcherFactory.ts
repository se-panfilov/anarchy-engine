import type { IGlobalContainerDecorator, IMousePositionWatcher } from '@/Engine';

export type IMousePositionWatcherFactory = {
  create: (container: IGlobalContainerDecorator, tags?: ReadonlyArray<string>) => IMousePositionWatcher;
};
