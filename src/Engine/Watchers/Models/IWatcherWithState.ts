import type { BehaviorSubject } from 'rxjs';
import type { IScreenParams } from '@Engine/Models';
import type { IAbstractWatcher } from '@Engine/Watchers';

export type IWatcherWithState<T> = IAbstractWatcher<T> &
  Readonly<{
    start: () => IWatcherWithState<T>;
    stop: () => IWatcherWithState<T>;
    latest$: BehaviorSubject<IScreenParams>;
  }>;
