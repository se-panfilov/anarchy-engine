import type { Observable } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractAsyncRegistry, IAbstractEntityRegistry } from '@/Engine/Abstract/Models';
import type { LookUpStrategy } from '@/Engine/Abstract/Registry/Constants';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import {
  getAsyncUniqEntityByNameAsync,
  getAsyncUniqEntityWithTag,
  getUniqEntityByName,
  getUniqEntityWithTag$,
  getUniqEntityWithTags$,
  getUniqEntityWithTagsAsync,
  omitInObjectWithoutMutation
} from '@/Engine/Utils';

import { AbstractEntityRegistry } from './AbstractEntityRegistry';

export function AbstractAsyncRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractAsyncRegistry<T> {
  const abstractRegistry: IAbstractEntityRegistry<T> = AbstractEntityRegistry<T>(type);

  const findByTagsAsync = (tags: ReadonlyArray<string>, strategy: LookUpStrategy): Promise<T | undefined> => getUniqEntityWithTagsAsync<T>(tags, abstractRegistry, strategy);
  const findByTagAsync = (tag: string): Promise<T | undefined> => getAsyncUniqEntityWithTag(tag, abstractRegistry);
  const findByNameAsync = (name: string): Promise<T | undefined> => getAsyncUniqEntityByNameAsync(name, abstractRegistry);

  const findByTags$ = (tags: ReadonlyArray<string>, strategy: LookUpStrategy): Observable<T> => getUniqEntityWithTags$<T>(tags, abstractRegistry, strategy);
  const findByTag$ = (tag: string): Observable<T> => getUniqEntityWithTag$(tag, abstractRegistry);
  const findByName$ = (name: string): Observable<T> => getUniqEntityByName(name, abstractRegistry);

  return {
    ...omitInObjectWithoutMutation(abstractRegistry, ['findByTags', 'findByTag', 'findByName']),
    findByTagsAsync,
    findByTags$,
    findByTagAsync,
    findByTag$,
    findByNameAsync,
    findByName$
  };
}
