import type { IGlobalContainerDecorator } from '@/Engine';

export type IMouseClickWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<string>;
}>;
