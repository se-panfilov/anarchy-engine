import type { TReactiveFactory } from '@/Engine/Abstract';
import type { TScreenSizeWatcher } from '@/Engine/Screen/Models';

import type { TScreenSizeWatcherParams } from './TScreenSizeWatcherParams';

export type TScreenSizeWatcherFactory = TReactiveFactory<TScreenSizeWatcher, TScreenSizeWatcherParams>;
