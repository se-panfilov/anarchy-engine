import type { Observable } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { TAbstractSimpleAsyncRegistry } from '@/Engine/Abstract/Models';
import { getAsyncUniqEntityByKeyAsync, getUniqEntityByKey$ } from '@/Engine/Utils';

export function AbstractSimpleAsyncRegistry<T>(type: RegistryType): TAbstractSimpleAsyncRegistry<T> {
  const abstractSimpleAsyncRegistry: TAbstractSimpleAsyncRegistry<T> = AbstractSimpleAsyncRegistry<T>(type);

  const findByKeyAsync = (key: string): Promise<T | undefined> => getAsyncUniqEntityByKeyAsync(key, abstractSimpleAsyncRegistry);
  const findByKey$ = (key: string): Observable<T> => getUniqEntityByKey$(key, abstractSimpleAsyncRegistry);

  return {
    ...abstractSimpleAsyncRegistry,
    findByKeyAsync,
    findByKey$
  };
}
