import type { TKeyWatcher } from '@Anarchy/Engine/Keyboard';

export type TKeyComboWatcherDependencies = Readonly<{
  keyPressWatcher: TKeyWatcher;
  keyReleaseWatcher: TKeyWatcher;
}>;
