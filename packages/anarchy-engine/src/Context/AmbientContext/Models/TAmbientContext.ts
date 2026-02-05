import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';

export type TAmbientContext = Readonly<{
  globalContainer: TContainerDecorator;
}>;
