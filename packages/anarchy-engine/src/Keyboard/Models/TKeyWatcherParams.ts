import type { WatcherTag } from '@hellpig/anarchy-engine/Abstract';
import type { TContainerDecorator } from '@hellpig/anarchy-engine/Global';
import type { KeyWatcherType } from '@hellpig/anarchy-engine/Keyboard/Constants';

export type TKeyWatcherParams = Readonly<{
  type: KeyWatcherType;
  container: TContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;

export type TKeyComboWatcherParams = TKeyWatcherParams;
