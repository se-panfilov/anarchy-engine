import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TKeyboardWatcherFactory } from '@Anarchy/Engine/Keyboard/Models';
import { KeyboardWatcher } from '@Anarchy/Engine/Keyboard/Watchers';

export const KeyboardWatcherFactory = (): TKeyboardWatcherFactory => ReactiveFactory(FactoryType.KeyboardWatcher, KeyboardWatcher);
