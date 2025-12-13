import type { IScreenParams, IWatcher } from '@Engine/Models';
import type { IGlobalContainerDecorator } from '@Engine/Global';

export interface IAmbientContext {
  readonly screenSizeWatcher: IWatcher<IScreenParams>;
  readonly container: IGlobalContainerDecorator;
}
