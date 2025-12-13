import type { IGlobalContainerDecorator } from '@/Engine/Global';
import type { IScreenSizeWatcher } from '@/Engine/Screen';

export type IAmbientContext = Readonly<{
  container: IGlobalContainerDecorator;
  screenSizeWatcher: IScreenSizeWatcher;
}>;
