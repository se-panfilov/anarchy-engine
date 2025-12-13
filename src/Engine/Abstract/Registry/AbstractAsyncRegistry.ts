import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractAsyncRegistry, IAbstractEntityRegistry } from '@/Engine/Abstract/Models';
import type { LookUpStrategy } from '@/Engine/Abstract/Registry/Constants';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { isDefined, omitInObjectWithoutMutation } from '@/Engine/Utils';

import { getValueAsync, subscribeToValue$ } from './AbstractAsyncRegistryHelper';
import { AbstractEntityRegistry } from './AbstractEntityRegistry';

export function AbstractAsyncRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractAsyncRegistry<T> {
  const abstractRegistry: IAbstractEntityRegistry<T> = AbstractEntityRegistry<T>(type);

  const findByTagsAsync = (tags: ReadonlyArray<string>, strategy: LookUpStrategy): Promise<T | undefined> =>
    getValueAsync<T>(abstractRegistry, (entity: T): boolean => entity.getTags()[strategy]((tag: string) => tags.includes(tag)));
  const findByTagAsync = (tag: string): Promise<T | undefined> => getValueAsync<T>(abstractRegistry, (entity: T): boolean => entity.hasTag(tag));
  const findByNameAsync = (name: string): Promise<T | undefined> => getValueAsync<T>(abstractRegistry, (entity: T): boolean => entity && entity.name === name);

  function findByTags$(tags: ReadonlyArray<string>, strategy: LookUpStrategy): Observable<T> {
    const result: T | undefined = abstractRegistry.findByTags(tags, strategy);
    if (isDefined(result)) new BehaviorSubject(result).asObservable();
    return subscribeToValue$<T>(abstractRegistry, (entity: T): boolean => entity.getTags()[strategy]((tag: string) => tags.includes(tag)));
  }

  function findByTag$(tag: string): Observable<T> {
    const result: T | undefined = abstractRegistry.findByTag(tag);
    if (isDefined(result)) new BehaviorSubject(result).asObservable();
    return subscribeToValue$<T>(abstractRegistry, (entity: T): boolean => entity.hasTag(tag));
  }

  function findByName$(name: string): Observable<T> {
    const result: T | undefined = abstractRegistry.findByName(name);
    if (isDefined(result)) new BehaviorSubject(result).asObservable();
    return subscribeToValue$<T>(abstractRegistry, (entity: T): boolean => entity.name === name);
  }

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
