import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, catchError, filter, of, take, timeout } from 'rxjs';

import type { IAbstractAsyncRegistry, IAbstractEntityRegistry, LookUpStrategy } from '@/Engine/Abstract';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { createDeferredPromise, isDefined } from '@/Engine/Utils';

export function getUniqEntityWithTagsAsync<T extends IRegistrable>(
  tags: ReadonlyArray<string>,
  registry: IAbstractEntityRegistry<T> | IAbstractAsyncRegistry<T>,
  strategy: LookUpStrategy,
  // TODO (S.Panfilov) should be set from default config
  waitingTime: number = 3000
): Promise<T | undefined> {
  return getValueAsync<T>(
    registry,
    (entity: T): boolean => {
      const entityTags: ReadonlyArray<string> = entity.getTags();
      return entityTags.length > 0 && entityTags[strategy]((tag: string) => tags.includes(tag));
    },
    undefined,
    waitingTime
  );
}

// TODO (S.Panfilov) all waiting times should be set from default config
export function getAsyncUniqEntityWithTag<T extends IRegistrable>(tag: string, registry: IAbstractEntityRegistry<T> | IAbstractAsyncRegistry<T>, waitingTime: number = 3000): Promise<T | undefined> {
  return getValueAsync<T>(registry, (entity: T): boolean => entity.hasTag(tag), undefined, waitingTime);
}

export function getAsyncUniqEntityByNameAsync<T extends IRegistrable>(
  name: string,
  registry: IAbstractEntityRegistry<T> | IAbstractAsyncRegistry<T>,
  waitingTime: number = 3000
): Promise<T | undefined> {
  return getValueAsync<T>(registry, (entity: T): boolean => isDefined(entity) && entity.name === name, undefined, waitingTime);
}

export function getUniqEntityWithTags$<T extends IRegistrable>(tags: ReadonlyArray<string>, registry: IAbstractEntityRegistry<T> | IAbstractAsyncRegistry<T>, strategy: LookUpStrategy): Observable<T> {
  const result: T | undefined = isDefined((registry as IAbstractEntityRegistry<T>).findByTags) ? (registry as IAbstractEntityRegistry<T>).findByTags(tags, strategy) : undefined;
  if (isDefined(result)) new BehaviorSubject(result).asObservable();
  return subscribeToValue$<T>(registry, (entity: T): boolean => entity.getTags()[strategy]((tag: string) => tags.includes(tag)));
}

export function getUniqEntityWithTag$<T extends IRegistrable>(tag: string, registry: IAbstractEntityRegistry<T> | IAbstractAsyncRegistry<T>): Observable<T> {
  const result: T | undefined = isDefined((registry as IAbstractEntityRegistry<T>).findByTag) ? (registry as IAbstractEntityRegistry<T>).findByTag(tag) : undefined;
  if (isDefined(result)) new BehaviorSubject(result).asObservable();
  return subscribeToValue$<T>(registry, (entity: T): boolean => entity.hasTag(tag));
}

// TODO (S.Panfilov) add unit tests
export function getUniqEntityByName$<T extends IRegistrable>(name: string, registry: IAbstractEntityRegistry<T> | IAbstractAsyncRegistry<T>): Observable<T> {
  const result: T | undefined = isDefined((registry as IAbstractEntityRegistry<T>).findByName) ? (registry as IAbstractEntityRegistry<T>).findByName(name) : undefined;
  if (isDefined(result)) new BehaviorSubject(result).asObservable();
  return subscribeToValue$<T>(registry, (entity: T): boolean => entity.name === name);
}

// TODO (S.Panfilov) i'm still not sure that this function should exist
export function getValueAsync<T extends IRegistrable | IMultitonRegistrable>(
  reg: IAbstractEntityRegistry<T> | IAbstractAsyncRegistry<T>,
  filterFn: (entity: T) => boolean,
  stopCb?: (stop: () => void) => void,
  // TODO (S.Panfilov) this time should be bigger and different for different entities (DEFAULT_WAITING_TIME + from params)
  waitingTime: number = 3000
  // waitingTime: number = 1000
): Promise<T | undefined> {
  const { resolve, promise, reject } = createDeferredPromise<T | undefined>();
  const destroySub$: Subscription = reg.destroyed$.subscribe(stop);

  const sub$: Subscription = reg.added$
    .pipe(
      filter(filterFn),
      take(1),
      timeout(waitingTime),
      catchError((error: any) => {
        // TODO (S.Panfilov) instead of console should be forwarded to some kind of logger
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (error?.name === 'TimeoutError') console.error(`Cannot get entity async from registry ("${reg.id}"): timeout error has occurred`);
        else console.error(`Cannot get entity async from registry ("${reg.id}"): unknown error has occurred`);
        return of(undefined);
      })
    )
    .subscribe(resolve);

  const result: T | undefined = reg.find(filterFn);
  if (isDefined(result)) {
    resolve(result);
    stop();
    return promise;
  }

  function stop(): void {
    reject();
    sub$.unsubscribe();
    destroySub$.unsubscribe();
  }

  if (isDefined(stopCb)) stopCb(stop);

  return promise;
}

export const subscribeToValue$ = <T extends IRegistrable | IMultitonRegistrable>(reg: IAbstractEntityRegistry<T> | IAbstractAsyncRegistry<T>, filterFn: (entity: T) => boolean): Observable<T> =>
  reg.added$.pipe(filter(filterFn), take(1));
