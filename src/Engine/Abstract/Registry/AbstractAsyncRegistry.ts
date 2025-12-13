import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import type { IAbstractRegistry, LookUpStrategy } from '@/Engine/Abstract';
import { AbstractRegistry } from '@/Engine/Abstract';
import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractAsyncRegistry } from '@/Engine/Abstract/Models';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';

import { subscribeToValue, subscribeToValue$ } from './AbstractAsyncRegistryHelper';

export function AbstractAsyncRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractAsyncRegistry<T> {
  const abstractRegistry: IAbstractRegistry<T> = AbstractRegistry<T>(type);

  function getUniqByTagsAsync(tags: ReadonlyArray<string>, strategy: LookUpStrategy): Promise<T> {
    const result: T | undefined = abstractRegistry.getUniqByTags(tags, strategy);
    if (isDefined(result)) return Promise.resolve(result);
    return subscribeToValue<T>(abstractRegistry, (entity: T) => entity.getTags()[strategy]((tag: string) => tags.includes(tag)));
  }

  function getUniqByTagAsync(tag: string): Promise<T> {
    const result: T | undefined = abstractRegistry.getUniqByTag(tag);
    if (isDefined(result)) return Promise.resolve(result);
    return subscribeToValue<T>(abstractRegistry, (entity: T) => entity.hasTag(tag));
  }

  function getUniqByTags$(tags: ReadonlyArray<string>, strategy: LookUpStrategy): Observable<T> {
    const result: T | undefined = abstractRegistry.getUniqByTags(tags, strategy);
    if (isDefined(result)) {
      const subj$ = new BehaviorSubject(result);
      return subj$.asObservable();
    }
    return subscribeToValue$<T>(abstractRegistry, (entity: T) => entity.getTags()[strategy]((tag: string) => tags.includes(tag)));
  }

  function getUniqByTag$(tag: string): Observable<T> {
    const result: T | undefined = abstractRegistry.getUniqByTag(tag);
    if (isDefined(result)) {
      console.log('111 actor is already here');
      const subj$ = new BehaviorSubject(result);
      return subj$.asObservable();
    }
    return subscribeToValue$<T>(abstractRegistry, (entity: T) => entity.hasTag(tag));
  }

  return {
    ...abstractRegistry,
    getUniqByTagsAsync,
    getUniqByTags$,
    getUniqByTagAsync,
    getUniqByTag$
  };
}
