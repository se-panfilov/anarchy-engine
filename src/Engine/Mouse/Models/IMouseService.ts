import type { Observable } from 'rxjs';

import type { IDestroyable } from '@/Engine';

import type { IMousePosition } from './IMousePosition';
import type { IMouseWatcherEvent } from './IMouseWatcherEvent';

export type IMouseService = Readonly<{
  clickPress$: Observable<IMouseWatcherEvent>;
  clickLeftPress$: Observable<IMouseWatcherEvent>;
  clickRightPress$: Observable<IMouseWatcherEvent>;
  clickMiddlePress$: Observable<IMouseWatcherEvent>;
  clickBackPress$: Observable<IMouseWatcherEvent>;
  clickForwardPress$: Observable<IMouseWatcherEvent>;
  clickExtraPress$: Observable<IMouseWatcherEvent>;

  clickRelease$: Observable<IMouseWatcherEvent>;
  clickLeftRelease$: Observable<IMouseWatcherEvent>;
  clickRightRelease$: Observable<IMouseWatcherEvent>;
  clickMiddleRelease$: Observable<IMouseWatcherEvent>;
  clickBackRelease$: Observable<IMouseWatcherEvent>;
  clickForwardRelease$: Observable<IMouseWatcherEvent>;
  clickExtraRelease$: Observable<IMouseWatcherEvent>;

  isLeftPressed$: Observable<boolean>;
  isRightPressed$: Observable<boolean>;
  isMiddlePressed$: Observable<boolean>;
  isBackPressed$: Observable<boolean>;
  isForwardPressed$: Observable<boolean>;
  isExtraPressed$: Observable<boolean>;

  doubleClick$: Observable<IMouseWatcherEvent>;
  doubleLeftClick$: Observable<IMouseWatcherEvent>;
  doubleRightClick$: Observable<IMouseWatcherEvent>;

  wheel$: Observable<IMouseWatcherEvent>;
  wheelUp$: Observable<IMouseWatcherEvent>;
  wheelDown$: Observable<IMouseWatcherEvent>;

  position$: Observable<IMousePosition>;
}> &
  IDestroyable;
