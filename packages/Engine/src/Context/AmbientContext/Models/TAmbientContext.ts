import type { TContainerDecorator } from '@/Engine/Global';

export type TAmbientContext = Readonly<{
  globalContainer: TContainerDecorator;
}>;
