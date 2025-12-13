import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, catchError, filter, of, take, timeout } from 'rxjs';

import type { LookUpStrategy, TAbstractAsyncRegistry, TAbstractEntityRegistry, TAbstractSimpleAsyncRegistry, TAbstractSimpleRegistry } from '@/Engine/Abstract';
import type { TMultitonRegistrable, TRegistrable } from '@/Engine/Mixins';

import { createDeferredPromise } from './AsyncUtils';
import { isDefined } from './CheckUtils';
import { shouldHaveTags } from './RegistryUtils';

export function getUniqEntityWithTagsAsync<T extends TRegistrable>(
  tags: ReadonlyArray<string>,
  registry: TAbstractEntityRegistry<T> | TAbstractAsyncRegistry<T>,
  strategy: LookUpStrategy,
  // TODO (S.Panfilov) should be set from default config
  waitingTime: number = 3000
): Promise<T | undefined> {
  return getEntityValueAsync<T>(registry, (entity: T): boolean => shouldHaveTags(entity, tags, strategy), undefined, waitingTime);
}

// TODO (S.Panfilov) all waiting times should be set from default config
export function getAsyncUniqEntityWithTag<T extends TRegistrable>(tag: string, registry: TAbstractEntityRegistry<T> | TAbstractAsyncRegistry<T>, waitingTime: number = 3000): Promise<T | undefined> {
  return getEntityValueAsync<T>(registry, (entity: T): boolean => entity.hasTag(tag), undefined, waitingTime);
}

export function getAsyncUniqEntityByNameAsync<T extends TRegistrable>(
  name: string,
  registry: TAbstractEntityRegistry<T> | TAbstractAsyncRegistry<T>,
  waitingTime: number = 3000
): Promise<T | undefined> {
  return getEntityValueAsync<T>(registry, (entity: T): boolean => isDefined(entity) && entity.name === name, undefined, waitingTime);
}

// TODO (S.Panfilov) add unit tests
export function getAsyncUniqEntityByKeyAsync<T>(key: string, registry: TAbstractSimpleRegistry<T> | TAbstractSimpleAsyncRegistry<T>, waitingTime: number = 3000): Promise<T | undefined> {
  return getValueAsync<T>(registry, (): boolean => isDefined(registry.findByKey(key)), undefined, waitingTime);
}

export function getUniqEntityWithTags$<T extends TRegistrable>(tags: ReadonlyArray<string>, registry: TAbstractEntityRegistry<T> | TAbstractAsyncRegistry<T>, strategy: LookUpStrategy): Observable<T> {
  const result: T | undefined = isDefined((registry as TAbstractEntityRegistry<T>).findByTags) ? (registry as TAbstractEntityRegistry<T>).findByTags(tags, strategy) : undefined;
  if (isDefined(result)) return new BehaviorSubject(result).asObservable();
  return subscribeToEntityValue$<T>(registry, (entity: T): boolean => shouldHaveTags(entity, tags, strategy));
}

export function getUniqEntityWithTag$<T extends TRegistrable>(tag: string, registry: TAbstractEntityRegistry<T> | TAbstractAsyncRegistry<T>): Observable<T> {
  const result: T | undefined = isDefined((registry as TAbstractEntityRegistry<T>).findByTag) ? (registry as TAbstractEntityRegistry<T>).findByTag(tag) : undefined;
  if (isDefined(result)) return new BehaviorSubject(result).asObservable();
  return subscribeToEntityValue$<T>(registry, (entity: T): boolean => entity.hasTag(tag));
}

export function getUniqEntityByName$<T extends TRegistrable>(name: string, registry: TAbstractEntityRegistry<T> | TAbstractAsyncRegistry<T>): Observable<T> {
  const result: T | undefined = isDefined((registry as TAbstractEntityRegistry<T>).findByName) ? (registry as TAbstractEntityRegistry<T>).findByName(name) : undefined;
  if (isDefined(result)) return new BehaviorSubject(result).asObservable();
  return subscribeToEntityValue$<T>(registry, (entity: T): boolean => entity.name === name);
}

// TODO (S.Panfilov) add unit tests
export function getUniqEntityByKey$<T>(key: string, registry: TAbstractSimpleRegistry<T> | TAbstractSimpleAsyncRegistry<T>): Observable<T> {
  const result: T | undefined = isDefined((registry as TAbstractSimpleRegistry<T>).findByKey) ? (registry as TAbstractSimpleRegistry<T>).findByKey(key) : undefined;
  if (isDefined(result)) return new BehaviorSubject(result).asObservable();
  return subscribeToSimpleValue$<T>(registry, (): boolean => isDefined(registry.findByKey(key)));
}

export function getEntityValueAsync<T extends TRegistrable | TMultitonRegistrable>(
  reg: TAbstractEntityRegistry<T> | TAbstractAsyncRegistry<T>,
  filterFn: (entity: T) => boolean,
  stopCb?: (stop: () => void) => void,
  // TODO (S.Panfilov) this time should be bigger and different for different entities (DEFAULT_WAITING_TIME + from params)
  waitingTime: number = 3000
): Promise<T | undefined> {
  return getValueAsync<T>(reg as unknown as TAbstractSimpleRegistry<T>, filterFn, stopCb, waitingTime);
}

export function getValueAsync<T>(
  reg: TAbstractSimpleRegistry<T> | TAbstractSimpleAsyncRegistry<T>,
  filterFn: (entity: T) => boolean,
  stopCb?: (stop: () => void) => void,
  // TODO (S.Panfilov) this time should be bigger and different for different entities (DEFAULT_WAITING_TIME + from params)
  waitingTime: number = 3000
): Promise<T | undefined> {
  const { resolve, promise, reject } = createDeferredPromise<T | undefined>();
  const destroySub$: Subscription = reg.destroyed$.subscribe(stop);

  const sub$: Subscription = reg.added$
    .pipe(
      filter(filterFn),
      take(1),
      timeout(waitingTime),
      catchError((error: any) => {
        // TODO (S.Panfilov) LOGGER: instead of console should be forwarded to some kind of logger
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

export const subscribeToSimpleValue$ = <T>(reg: TAbstractSimpleRegistry<T> | TAbstractSimpleAsyncRegistry<T>, filterFn: (entity: T) => boolean): Observable<T> =>
  reg.added$.pipe(filter(filterFn), take(1));

export const subscribeToEntityValue$ = <T extends TRegistrable | TMultitonRegistrable>(reg: TAbstractEntityRegistry<T> | TAbstractAsyncRegistry<T>, filterFn: (entity: T) => boolean): Observable<T> =>
  reg.added$.pipe(filter(filterFn), take(1));
