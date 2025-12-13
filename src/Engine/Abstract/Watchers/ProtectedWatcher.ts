import type { TAbstractProtectedWatcher, TAbstractWatcher } from '@/Engine/Abstract/Models';

export function ProtectedWatcher<T extends TAbstractWatcher<R>, R>(watcher: T): TAbstractProtectedWatcher<R> {
  // eslint-disable-next-line functional/immutable-data
  return Object.assign(watcher, {
    value$: watcher.value$.asObservable()
  });
}
