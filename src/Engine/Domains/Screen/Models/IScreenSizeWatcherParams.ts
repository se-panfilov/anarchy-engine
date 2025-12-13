import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

export type IScreenSizeWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<string>;
}>;
