import type { ScreenParams, Watcher } from '@Engine/Models';

export interface IAmbientContext {
  readonly deviceWatcher: Watcher<ScreenParams>;
}
