import type { TReactiveFactory } from '@Anarchy/Engine/Abstract';

import type { TKeyboardWatcher } from './TKeyboardWatcher';
import type { TKeyboardWatcherParams } from './TKeyboardWatcherParams';

export type TKeyboardWatcherFactory = TReactiveFactory<TKeyboardWatcher, TKeyboardWatcherParams>;
