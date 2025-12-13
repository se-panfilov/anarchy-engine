import type { IScreenParams } from '@Engine/Models';
import type { IGlobalContainerDecorator } from '@Engine/Global';
import type { IWatcher } from '@Engine/Watchers';

export interface IAmbientContext {
  readonly screenSizeWatcher: IWatcher<IScreenParams>;
  readonly container: IGlobalContainerDecorator;
}
