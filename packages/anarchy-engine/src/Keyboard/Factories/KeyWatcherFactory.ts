import { FactoryType, ReactiveFactory } from '@hellpig/anarchy-engine/Abstract';
import { KeyWatcherType } from '@hellpig/anarchy-engine/Keyboard/Constants';
import type { TKeyComboWatcher, TKeyComboWatcherDependencies, TKeyComboWatcherParams, TKeyWatcher, TKeyWatcherFactory, TKeyWatcherParams } from '@hellpig/anarchy-engine/Keyboard/Models';
import { KeyPressWatcher, KeyReleaseWatcher } from '@hellpig/anarchy-engine/Keyboard/Watchers';
import { KeyComboWatcher } from '@hellpig/anarchy-engine/Keyboard/Watchers/KeyComboWatcher';

function create(params: TKeyWatcherParams | TKeyComboWatcherParams, deps?: TKeyComboWatcherDependencies): TKeyWatcher | TKeyComboWatcher | never {
  if (params.type === KeyWatcherType.Press) return KeyPressWatcher(params as TKeyWatcherParams);
  if (params.type === KeyWatcherType.Release) return KeyReleaseWatcher(params as TKeyWatcherParams);
  if (params.type === KeyWatcherType.Combo) return KeyComboWatcher(params as TKeyComboWatcherParams, deps as TKeyComboWatcherDependencies);
  else throw new Error(`[KeyWatcherFactory]: Cannot create key watcher from params: unknown watcher type "${(params as any).type}"`);
}

export const KeyWatcherFactory = (): TKeyWatcherFactory => ReactiveFactory(FactoryType.KeyWatcher, create);
