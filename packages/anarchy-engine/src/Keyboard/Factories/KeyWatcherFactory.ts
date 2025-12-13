import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import type { TKeyComboWatcher, TKeyComboWatcherDependencies, TKeyComboWatcherParams } from '@Anarchy/Engine/Keyboard';
import { KeyWatcherType } from '@Anarchy/Engine/Keyboard';
import type { TKeyWatcher, TKeyWatcherFactory, TKeyWatcherParams } from '@Anarchy/Engine/Keyboard/Models';
import { KeyPressWatcher, KeyReleaseWatcher } from '@Anarchy/Engine/Keyboard/Watchers';
import { KeyComboWatcher } from '@Anarchy/Engine/Keyboard/Watchers/KeyComboWatcher';

function create(params: TKeyWatcherParams | TKeyComboWatcherParams, deps?: TKeyComboWatcherDependencies): TKeyWatcher | TKeyComboWatcher | never {
  if (params.type === KeyWatcherType.Press) return KeyPressWatcher(params as TKeyWatcherParams);
  if (params.type === KeyWatcherType.Release) return KeyReleaseWatcher(params as TKeyWatcherParams);
  if (params.type === KeyWatcherType.Combo) return KeyComboWatcher(params as TKeyComboWatcherParams, deps as TKeyComboWatcherDependencies);
  else throw new Error(`[KeyWatcherFactory]: Cannot create key watcher from params: unknown watcher type "${(params as any).type}"`);
}

export const KeyWatcherFactory = (): TKeyWatcherFactory => ReactiveFactory(FactoryType.KeyWatcher, create);
