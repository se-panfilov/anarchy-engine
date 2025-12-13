import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TMouseClickWatcher } from '@Anarchy/Engine/Mouse/Models';

import type { TMouseClickWatcherParams } from './TMouseClickWatcherParams';

export type TMouseClickWatcherFactory = TReactiveFactory<TMouseClickWatcher, TMouseClickWatcherParams>;
