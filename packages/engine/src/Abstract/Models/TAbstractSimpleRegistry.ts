import type { RegistryType } from '@Engine/Abstract/Constants';
import type { TDestroyable, TNoSpread, TWithId } from '@Engine/Mixins';
import type { Observable } from 'rxjs';

import type { TRegistryPack } from './TRegistryPack';
import type { TWithBaseAccessorsRegistry } from './TWithBaseAccessorsRegistry';
import type { TWithReactiveRegistry } from './TWithReactiveRegistry';

export type TAbstractSimpleRegistry<T> = TWithBaseAccessorsRegistry<T> &
  Omit<TWithReactiveRegistry<T>, 'added$' | 'replaced$' | 'removed$'> &
  Readonly<{
    add: (key: string, value: T) => void;
    added$: Observable<TRegistryPack<T>>;
    asArray: () => ReadonlyArray<T>;
    asObject: () => Record<string, T>;
    findByKey: (key: string) => T | undefined;
    findKeyByValue: (value: T) => string | undefined;
    getByKey: (key: string) => T | never;
    getKeyByValue: (value: T) => string | never;
    getRegistryCopy: () => Map<string, T>;
    remove: (key: string) => void;
    removed$: Observable<TRegistryPack<T>>;
    replace: (key: string, value: T) => void;
    replaced$: Observable<TRegistryPack<T>>;
    type: RegistryType | string;
  }> &
  TWithId &
  TDestroyable &
  TNoSpread;
