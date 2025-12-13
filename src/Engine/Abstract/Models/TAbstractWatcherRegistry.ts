import type { TAbstractEntityRegistry } from './TAbstractEntityRegistry';
import type { TAbstractProtectedWatcherWithState } from './TAbstractProtectedWatcherWithState';
import type { TAbstractWatcher } from './TAbstractWatcher';

export type TAbstractWatcherRegistry<T extends TAbstractWatcher<any> | TAbstractProtectedWatcherWithState<any>> = TAbstractEntityRegistry<T>;
