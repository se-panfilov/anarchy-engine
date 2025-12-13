import { IGlobalContainerDecorator } from '@/Engine';

export type IMousePositionWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<string>;
}>;
