import { FactoryType, ReactiveFactory } from '@Anarchy/Engine/Abstract';
import { KeyWatcherType } from '@Anarchy/Engine/Keyboard';
import type { TKeyWatcher, TKeyWatcherFactory, TKeyWatcherParams } from '@Anarchy/Engine/Keyboard/Models';
import { KeyPressWatcher, KeyReleaseWatcher } from '@Anarchy/Engine/Keyboard/Watchers';

function create(params: TKeyWatcherParams): TKeyWatcher | never {
  if (params.type === KeyWatcherType.Press) return KeyPressWatcher(params);
  if (params.type === KeyWatcherType.Release) return KeyReleaseWatcher(params);
  else throw new Error(`[KeyWatcherFactory]: Cannot create key watcher from params: unknown watcher type "${(params as any).type}"`);
}

export const KeyWatcherFactory = (): TKeyWatcherFactory => ReactiveFactory(FactoryType.KeyWatcher, create);
