import type { TGlobalContainerDecorator } from '@/Engine/Global';

export type TAmbientContext = Readonly<{
  container: TGlobalContainerDecorator;
}>;
