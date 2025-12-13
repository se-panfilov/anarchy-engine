import type { IGlobalContainerDecorator, IMouseClicksWatcher } from '@/Engine';

export type IMouseClicksWatcherFactory = {
  create: (container: IGlobalContainerDecorator, tags?: ReadonlyArray<string>) => IMouseClicksWatcher;
};
