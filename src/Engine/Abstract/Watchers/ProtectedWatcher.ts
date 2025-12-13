import type { TAbstractProtectedWatcher, TAbstractWatcher } from '@/Engine/Abstract/Models';

export function ProtectedWatcher<T extends TAbstractWatcher<R>, R>(watcher: T): TAbstractProtectedWatcher<R> {
  return {
    ...watcher,
    value$: watcher.value$.asObservable()
  };
}
