import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TMouseClickWatcher } from './TMouseClickWatcher';
import type { TMouseClickWatcherParams } from './TMouseClickWatcherParams';

export type TMouseClickWatcherFactory = TReactiveFactory<TMouseClickWatcher, TMouseClickWatcherParams>;
