import type { TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';
import type { IScreenSizeWatcher } from '@/Engine/Screen/Models';

import type { IScreenSizeWatcherParams } from './IScreenSizeWatcherParams';

export type IScreenSizeWatcherFactory = TReactiveFactory<IScreenSizeWatcher, IScreenSizeWatcherParams> & TDestroyable;
