import type { IGlobalContainerDecorator } from '@Engine/Global';

export type IMousePositionWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<string>;
}>;
