import type { TKeyWatcher } from './TKeyWatcher';

export type TKeyComboWatcherDependencies = Readonly<{
  keyPressWatcher: TKeyWatcher;
  keyReleaseWatcher: TKeyWatcher;
}>;
