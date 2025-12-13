import type { Observable } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TDestroyable } from '@/Engine/Mixins';

import type { TWithBaseAccessorsRegistry } from './TWithBaseAccessorsRegistry';
import type { TWithReactiveRegistry } from './TWithReactiveRegistry';

export type TAbstractSimpleRegistry<T> = TWithBaseAccessorsRegistry<T> &
  Omit<TWithReactiveRegistry<T>, 'added$' | 'replaced$' | 'removed$'> &
  Readonly<{
    id: string;
    type: RegistryType | string;
    add: (key: string, value: T) => void;
    replace: (key: string, value: T) => void;
    registry: Map<string, T>;
    getByKey: (key: string) => T | undefined;
    findAll: () => ReadonlyArray<T>;
    remove: (key: string) => void;
    added$: Observable<T>;
    replaced$: Observable<T>;
    removed$: Observable<T>;
  }> &
  TDestroyable;
