import type { IMousePositionWatcher, IMousePositionWatcherParams } from '../Models';
import { MousePositionWatcher } from '../Watcher';

export function createMousePositionWatcher({ container, tags }: IMousePositionWatcherParams): IMousePositionWatcher {
  return MousePositionWatcher(container, tags);
}
