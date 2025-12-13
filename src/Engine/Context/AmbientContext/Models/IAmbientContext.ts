import type { IScreenParams, IWatcher } from '@Engine/Models';

export interface IAmbientContext {
  readonly screenSizeWatcher: IWatcher<IScreenParams>;
}
