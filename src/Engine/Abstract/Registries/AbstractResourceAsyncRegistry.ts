import type { Observable } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractResourceAsyncRegistry, TAbstractSimpleRegistry } from '@/Engine/Abstract/Models';
import { getAsyncUniqEntityByKeyAsync, getUniqEntityByKey$ } from '@/Engine/Utils';

import { AbstractSimpleRegistry } from './AbstractSimpleRegistry';

export function AbstractResourceAsyncRegistry<T>(type: RegistryType): TAbstractResourceAsyncRegistry<T> {
  const abstractSimpleAsyncRegistry: TAbstractSimpleRegistry<T> = AbstractSimpleRegistry<T>(type);

  const findByKeyAsync = (key: string): Promise<T | undefined> => getAsyncUniqEntityByKeyAsync(key, abstractSimpleAsyncRegistry);
  const findByKey$ = (key: string): Observable<T> => getUniqEntityByKey$(key, abstractSimpleAsyncRegistry);

  // eslint-disable-next-line functional/immutable-data
  return Object.assign(abstractSimpleAsyncRegistry, {
    findByKey$,
    findByKeyAsync
  });
}
