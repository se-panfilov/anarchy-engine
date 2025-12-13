import type { IMultitonWatcher } from '@/Engine/Abstract';

import type { IMouseWatcherEvent } from './IMouseWatcherEvent';

export type IMouseClickWatcher = IMultitonWatcher<IMouseWatcherEvent>;
