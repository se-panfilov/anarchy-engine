import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

export type IMousePositionWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags: ReadonlyArray<string>;
}>;
