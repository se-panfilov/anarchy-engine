import type { TReactiveFactory } from '@/Engine/Abstract';
import type { TMouseClickWatcher } from '@/Engine/Mouse/Models';

import type { TMouseClickWatcherParams } from './TMouseClickWatcherParams';

export type TMouseClickWatcherFactory = TReactiveFactory<TMouseClickWatcher, TMouseClickWatcherParams>;
