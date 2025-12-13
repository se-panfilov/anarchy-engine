import type { IAbstractWatcher } from '@Engine/Domains/Abstract';
import type { BehaviorSubject } from 'rxjs';

export type IAbstractWatcherWithState<T> = IAbstractWatcher<T> &
  Readonly<{
    latest$: BehaviorSubject<T>;
  }>;
