import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { IAbstractEntityRegistry, LookUpStrategy } from '@/Engine/Abstract';
import { AbstractEntityRegistry } from '@/Engine/Abstract';
import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractAsyncRegistry } from '@/Engine/Abstract/Models';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { isDefined, omitInObjectWithoutMutation } from '@/Engine/Utils';

import { getValueAsync, subscribeToValue$ } from './AbstractAsyncRegistryHelper';

export function AbstractAsyncRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractAsyncRegistry<T> {
  const abstractRegistry: IAbstractEntityRegistry<T> = AbstractEntityRegistry<T>(type);

  function findByTagsAsync(tags: ReadonlyArray<string>, strategy: LookUpStrategy): Promise<T> {
    const result: T | undefined = abstractRegistry.findByTags(tags, strategy);
    if (isDefined(result)) return Promise.resolve(result);
    return getValueAsync<T>(abstractRegistry, (entity: T) => entity.getTags()[strategy]((tag: string) => tags.includes(tag)));
  }

  function findByTagAsync(tag: string): Promise<T> {
    const result: T | undefined = abstractRegistry.findByTag(tag);
    if (isDefined(result)) return Promise.resolve(result);
    return getValueAsync<T>(abstractRegistry, (entity: T) => entity.hasTag(tag));
  }

  function findByTags$(tags: ReadonlyArray<string>, strategy: LookUpStrategy): Observable<T> {
    const result: T | undefined = abstractRegistry.findByTags(tags, strategy);
    if (isDefined(result)) {
      const subj$: BehaviorSubject<T> = new BehaviorSubject(result);
      return subj$.asObservable();
    }
    return subscribeToValue$<T>(abstractRegistry, (entity: T) => entity.getTags()[strategy]((tag: string) => tags.includes(tag)));
  }

  function findByTag$(tag: string): Observable<T> {
    const result: T | undefined = abstractRegistry.findByTag(tag);
    if (isDefined(result)) {
      const subj$: BehaviorSubject<T> = new BehaviorSubject(result);
      return subj$.asObservable();
    }
    return subscribeToValue$<T>(abstractRegistry, (entity: T) => entity.hasTag(tag));
  }

  return {
    ...omitInObjectWithoutMutation(abstractRegistry, ['findByTags', 'findByTag']),
    findByTagsAsync,
    findByTags$,
    findByTagAsync,
    findByTag$
  };
}
