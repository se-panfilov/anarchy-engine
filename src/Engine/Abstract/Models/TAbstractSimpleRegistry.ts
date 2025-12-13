import type { Observable } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TAbstractRegistryPack } from './TAbstractRegistryPack';
import type { TWithBaseAccessorsRegistry } from './TWithBaseAccessorsRegistry';
import type { TWithReactiveRegistry } from './TWithReactiveRegistry';

export type TAbstractSimpleRegistry<T> = TWithBaseAccessorsRegistry<T> &
  Omit<TWithReactiveRegistry<T>, 'added$' | 'replaced$' | 'removed$'> &
  Readonly<{
    id: string;
    add: (key: string, value: T) => void;
    added$: Observable<TAbstractRegistryPack<T>>;
    findByKey: (key: string) => T | undefined;
    getAll: () => ReadonlyArray<T>;
    getRegistryCopy: () => Map<string, T>;
    registry: Map<string, T>;
    remove: (key: string) => void;
    removed$: Observable<TAbstractRegistryPack<T>>;
    replace: (key: string, value: T) => void;
    replaced$: Observable<TAbstractRegistryPack<T>>;
    type: RegistryType | string;
  }> &
  TDestroyable;
