import type { Observable } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IDestroyable } from '@/Engine/Mixins';

export type IAbstractSimpleRegistry<T> = Readonly<{
  id: string;
  type: RegistryType | string;
  add: (key: string, value: T) => void;
  added$: Observable<T>;
  replace: (key: string, value: T) => void;
  replaced$: Observable<T>;
  registry: Map<string, T>;
  getByKey: (key: string) => T | undefined;
  getAll: () => ReadonlyArray<T>;
  isEmpty: () => boolean;
  remove: (key: string) => void;
  removed$: Observable<T>;
  getLength: () => number;
  forEach: (callback: (entity: T) => void) => void;
  find: (callback: (entity: T) => boolean) => T | undefined;
}> &
  IDestroyable;
