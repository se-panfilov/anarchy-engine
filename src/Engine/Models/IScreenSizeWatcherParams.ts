import type { IGlobalContainerDecorator } from '@/Engine';

export type IScreenSizeWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<string>;
}>;
