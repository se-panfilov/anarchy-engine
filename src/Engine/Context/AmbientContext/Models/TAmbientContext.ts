import type { TGlobalContainerDecorator } from '@/Engine/Global';
import type { TScreenSizeWatcher } from '@/Engine/Screen';

export type TAmbientContext = Readonly<{
  container: TGlobalContainerDecorator;
  screenSizeWatcher: TScreenSizeWatcher;
}>;
