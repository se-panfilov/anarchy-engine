import type { TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { TScreenSizeWatcher } from '@/Engine/Screen/Models';

import type { TScreenSizeWatcherParams } from './TScreenSizeWatcherParams';

export type TScreenSizeWatcherFactory = TReactiveFactory<TScreenSizeWatcher, TScreenSizeWatcherParams> & TDestroyable;
