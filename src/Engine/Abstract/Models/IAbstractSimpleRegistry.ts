import type { Observable } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IDestroyable } from '@/Engine/Mixins';

import type { IWithBaseAccessorsRegistry } from './IWithBaseAccessorsRegistry';
import type { IWithReactiveRegistry } from './IWithReactiveRegistry';

export type IAbstractSimpleRegistry<T> = IWithBaseAccessorsRegistry<T> &
  Omit<IWithReactiveRegistry<T>, 'added$' | 'replaced$' | 'removed$'> &
  Readonly<{
    id: string;
    type: RegistryType | string;
    add: (key: string, value: T) => void;
    replace: (key: string, value: T) => void;
    registry: Map<string, T>;
    getByKey: (key: string) => T | undefined;
    getAll: () => ReadonlyArray<T>;
    remove: (key: string) => void;
    added$: Observable<T>;
    replaced$: Observable<T>;
    removed$: Observable<T>;
  }> &
  IDestroyable;
