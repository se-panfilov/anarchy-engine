import type { Observable } from 'rxjs';
import type { Vector2Like } from 'three';

import type { TAbstractService } from '@/Engine/Abstract';

import type { TMouseClickWatcherFactory } from './TMouseClickWatcherFactory';
import type { TMouseClickWatcherRegistry } from './TMouseClickWatcherRegistry';
import type { TMousePositionWatcherFactory } from './TMousePositionWatcherFactory';
import type { TMousePositionWatcherRegistry } from './TMousePositionWatcherRegistry';
import type { TMouseWatcherEvent } from './TMouseWatcherEvent';

export type TMouseService = TAbstractService &
  Readonly<{
    clickPress$: Observable<TMouseWatcherEvent>;
    clickLeftPress$: Observable<TMouseWatcherEvent>;
    clickRightPress$: Observable<TMouseWatcherEvent>;
    clickMiddlePress$: Observable<TMouseWatcherEvent>;
    clickBackPress$: Observable<TMouseWatcherEvent>;
    clickForwardPress$: Observable<TMouseWatcherEvent>;
    clickExtraPress$: Observable<TMouseWatcherEvent>;

    clickRelease$: Observable<TMouseWatcherEvent>;
    clickLeftRelease$: Observable<TMouseWatcherEvent>;
    clickRightRelease$: Observable<TMouseWatcherEvent>;
    clickMiddleRelease$: Observable<TMouseWatcherEvent>;
    clickBackRelease$: Observable<TMouseWatcherEvent>;
    clickForwardRelease$: Observable<TMouseWatcherEvent>;
    clickExtraRelease$: Observable<TMouseWatcherEvent>;

    isLeftPressed$: Observable<boolean>;
    isRightPressed$: Observable<boolean>;
    isMiddlePressed$: Observable<boolean>;
    isBackPressed$: Observable<boolean>;
    isForwardPressed$: Observable<boolean>;
    isExtraPressed$: Observable<boolean>;

    doubleClick$: Observable<TMouseWatcherEvent>;
    doubleLeftClick$: Observable<TMouseWatcherEvent>;
    doubleRightClick$: Observable<TMouseWatcherEvent>;

    wheel$: Observable<TMouseWatcherEvent>;
    wheelUp$: Observable<TMouseWatcherEvent>;
    wheelDown$: Observable<TMouseWatcherEvent>;

    position$: Observable<Vector2Like>;
    normalizedPosition$: Observable<Vector2Like>;

    getMouseClickWatcherRegistry: () => TMouseClickWatcherRegistry;
    getMouseClickWatcherFactory: () => TMouseClickWatcherFactory;
    getMousePositionWatcherRegistry: () => TMousePositionWatcherRegistry;
    getMousePositionWatcherFactory: () => TMousePositionWatcherFactory;
  }>;
