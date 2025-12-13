import type { WatcherTag } from '@Anarchy/Engine/Abstract';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';
import type { KeyWatcherType } from '@Anarchy/Engine/Keyboard';

export type TKeyWatcherParams = Readonly<{
  type: KeyWatcherType;
  container: TContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;

export type TKeyComboWatcherParams = Omit<TKeyWatcherParams, 'container'>;
