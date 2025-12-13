import type { ScreenParams, Watcher } from '@Engine/Models';

export interface IAmbientContext {
  readonly screenSizeWatcher: Watcher<ScreenParams>;
}
