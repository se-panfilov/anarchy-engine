import type { IGlobalContainerDecorator } from '@Engine/Domains/Global';

export type IMouseClickWatcherParams = Readonly<{
  container: IGlobalContainerDecorator;
  tags?: ReadonlyArray<string>;
}>;
