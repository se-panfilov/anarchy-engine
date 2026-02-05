import type { TReactiveFactory } from '@hellpig/anarchy-engine/Abstract';

import type { TMouseClickWatcher } from './TMouseClickWatcher';
import type { TMouseClickWatcherParams } from './TMouseClickWatcherParams';

export type TMouseClickWatcherFactory = TReactiveFactory<TMouseClickWatcher, TMouseClickWatcherParams>;
