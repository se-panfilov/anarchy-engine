import type { TContainerDecorator } from '@/Global';

export type TAmbientContext = Readonly<{
  globalContainer: TContainerDecorator;
}>;
