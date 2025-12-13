import type { IReactiveFactory } from '@/Engine/Domains/Abstract';
import type { IScreenSizeWatcher } from '@/Engine/Domains/Screen/Models';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IScreenSizeWatcherParams } from './IScreenSizeWatcherParams';

export type IScreenSizeWatcherFactory = IReactiveFactory<IScreenSizeWatcher, IScreenSizeWatcherParams> & IDestroyable;
