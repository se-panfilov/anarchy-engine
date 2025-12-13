import type { IScreenParams } from '@Engine/Models';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IWatcher } from '@Engine/Watchers';

export type IAmbientContext = Readonly<{
  screenSizeWatcher: IWatcher<IScreenParams>;
  container: IGlobalContainerDecorator;
}>;
