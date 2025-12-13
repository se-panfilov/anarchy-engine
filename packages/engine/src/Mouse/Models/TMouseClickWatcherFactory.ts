import type { TReactiveFactory } from '@/Abstract';
import type { TMouseClickWatcher } from '@/Mouse/Models';

import type { TMouseClickWatcherParams } from './TMouseClickWatcherParams';

export type TMouseClickWatcherFactory = TReactiveFactory<TMouseClickWatcher, TMouseClickWatcherParams>;
