import type { IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';
import type { IScreenSizeWatcher } from '@/Engine/Screen/Models';

import type { IScreenSizeWatcherParams } from './IScreenSizeWatcherParams';

export type IScreenSizeWatcherFactory = IReactiveFactory<IScreenSizeWatcher, IScreenSizeWatcherParams> & IDestroyable;
