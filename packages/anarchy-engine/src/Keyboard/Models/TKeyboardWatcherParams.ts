import type { WatcherTag } from '@Anarchy/Engine/Abstract';
import type { TContainerDecorator } from '@Anarchy/Engine/Global';

export type TKeyboardWatcherParams = Readonly<{
  container: TContainerDecorator;
  tags?: ReadonlyArray<WatcherTag | string>;
}>;
