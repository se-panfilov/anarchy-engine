import type { IMousePositionWatcher } from '../Models';

export type IMousePositionAccessors = Readonly<{
  start: () => IMousePositionWatcher;
  stop: () => IMousePositionWatcher;
}>;
