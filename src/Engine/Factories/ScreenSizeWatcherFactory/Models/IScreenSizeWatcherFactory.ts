import type { IGlobalContainerDecorator, IScreenSizeWatcher } from '@/Engine';

export type IScreenSizeWatcherFactory = {
  create: (container: IGlobalContainerDecorator, tags?: ReadonlyArray<string>) => IScreenSizeWatcher;
};
