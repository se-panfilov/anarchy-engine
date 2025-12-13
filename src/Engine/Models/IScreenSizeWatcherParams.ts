import type { IGlobalContainerDecorator } from '@Engine/Global';

export type IScreenSizeWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<string>;
}>;
