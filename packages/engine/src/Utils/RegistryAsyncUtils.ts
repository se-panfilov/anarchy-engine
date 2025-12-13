import type { Observable, Subscription } from 'rxjs';
import { BehaviorSubject, catchError, filter, map, of, take, takeUntil, timeout } from 'rxjs';

import type { LookUpStrategy, TAbstractAsyncEntityRegistry, TAbstractEntityRegistry, TAbstractResourceAsyncRegistry, TAbstractSimpleRegistry, TRegistryPack } from '@/Abstract';
import type { TMultitonRegistrable, TRegistrable } from '@/Mixins';

import { createDeferredPromise } from './AsyncUtils';
import { isDefined } from './CheckUtils';
import { shouldHaveTags } from './RegistryUtils';
import { hasTag } from './TagsUtils';

export function getUniqEntityWithTagsAsync<T extends TRegistrable>(
  tags: ReadonlyArray<string>,
  registry: TAbstractEntityRegistry<T> | TAbstractAsyncEntityRegistry<T>,
  strategy: LookUpStrategy,
  // TODO should be set from default config
  waitingTime: number = 3000
): Promise<T | undefined> {
  return getEntityValueAsync<T>(registry, (entity: T): boolean => shouldHaveTags(entity, tags, strategy), undefined, waitingTime);
}

// TODO all waiting times should be set from default config
export function getAsyncUniqEntityWithTag<T extends TRegistrable>(
  tag: string,
  registry: TAbstractEntityRegistry<T> | TAbstractAsyncEntityRegistry<T>,
  waitingTime: number = 3000
): Promise<T | undefined> {
  return getEntityValueAsync<T>(registry, (entity: T): boolean => hasTag(entity, tag), undefined, waitingTime);
}

export function getAsyncUniqEntityByNameAsync<T extends TRegistrable>(
  name: string,
  registry: TAbstractEntityRegistry<T> | TAbstractAsyncEntityRegistry<T>,
  waitingTime: number = 3000
): Promise<T | undefined> {
  return getEntityValueAsync<T>(registry, (entity: T): boolean => isDefined(entity) && entity.name === name, undefined, waitingTime);
}

export function getAsyncUniqEntityByKeyAsync<T>(key: string, registry: TAbstractSimpleRegistry<T> | TAbstractResourceAsyncRegistry<T>, waitingTime: number = 3000): Promise<T | undefined> {
  return getValueAsync<T>(registry, (): boolean => isDefined(registry.findByKey(key)), undefined, waitingTime);
}

export function getUniqEntityWithTags$<T extends TRegistrable>(
  tags: ReadonlyArray<string>,
  registry: TAbstractEntityRegistry<T> | TAbstractAsyncEntityRegistry<T>,
  strategy: LookUpStrategy
): Observable<T> {
  const result: T | undefined = isDefined((registry as TAbstractEntityRegistry<T>).findByTags) ? (registry as TAbstractEntityRegistry<T>).findByTags(tags, strategy) : undefined;
  if (isDefined(result)) return new BehaviorSubject(result).asObservable();
  return subscribeToEntityValue$<T>(registry, (pack: TRegistryPack<T>): boolean => shouldHaveTags(pack.value, tags, strategy));
}

export function getUniqEntityWithTag$<T extends TRegistrable>(tag: string, registry: TAbstractEntityRegistry<T> | TAbstractAsyncEntityRegistry<T>): Observable<T> {
  const result: T | undefined = isDefined((registry as TAbstractEntityRegistry<T>).findByTag) ? (registry as TAbstractEntityRegistry<T>).findByTag(tag) : undefined;
  if (isDefined(result)) return new BehaviorSubject(result).asObservable();
  return subscribeToEntityValue$<T>(registry, (pack: TRegistryPack<T>): boolean => hasTag(pack.value, tag));
}

export function getUniqEntityByName$<T extends TRegistrable>(name: string, registry: TAbstractEntityRegistry<T> | TAbstractAsyncEntityRegistry<T>): Observable<T> {
  const result: T | undefined = isDefined((registry as TAbstractEntityRegistry<T>).findByName) ? (registry as TAbstractEntityRegistry<T>).findByName(name) : undefined;
  if (isDefined(result)) return new BehaviorSubject(result).asObservable();
  return subscribeToEntityValue$<T>(registry, (pack: TRegistryPack<T>): boolean => pack.value.name === name);
}

export function getUniqEntityByKey$<T>(key: string, registry: TAbstractSimpleRegistry<T> | TAbstractResourceAsyncRegistry<T>): Observable<T> {
  const result: T | undefined = isDefined((registry as TAbstractSimpleRegistry<T>).findByKey) ? (registry as TAbstractSimpleRegistry<T>).findByKey(key) : undefined;
  if (isDefined(result)) return new BehaviorSubject(result).asObservable();
  return subscribeToSimpleValue$<T>(registry, (): boolean => isDefined(registry.findByKey(key)));
}

export function getEntityValueAsync<T extends TRegistrable | TMultitonRegistrable>(
  reg: TAbstractEntityRegistry<T> | TAbstractAsyncEntityRegistry<T>,
  filterFn: (entity: T) => boolean,
  stopCb?: (stop: () => void) => void,
  // TODO this time should be bigger and different for different entities (DEFAULT_WAITING_TIME + from params)
  waitingTime: number = 3000
): Promise<T | undefined> {
  return getValueAsync<T>(reg as unknown as TAbstractSimpleRegistry<T>, filterFn, stopCb, waitingTime);
}

export function getValueAsync<T>(
  reg: TAbstractSimpleRegistry<T> | TAbstractResourceAsyncRegistry<T>,
  filterFn: (entity: T) => boolean,
  stopCb?: (stop: () => void) => void,
  // TODO this time should be bigger and different for different entities (DEFAULT_WAITING_TIME + from params)
  waitingTime: number = 3000
): Promise<T | undefined> {
  const { resolve, promise, reject } = createDeferredPromise<T | undefined>();
  const destroySub$: Subscription = reg.destroy$.subscribe(stop);

  reg.added$
    .pipe(
      filter(({ value }: TRegistryPack<T>): boolean => filterFn(value)),
      take(1),
      map((pack: TRegistryPack<T>): T => pack.value),
      timeout(waitingTime),
      takeUntil(reg.destroy$),
      catchError((error: any) => {
        // TODO LOGGER: instead of console should be forwarded to some kind of logger
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
    destroySub$.unsubscribe();
  }

  if (isDefined(stopCb)) stopCb(stop);

  return promise;
}

export const subscribeToSimpleValue$ = <T>(reg: TAbstractSimpleRegistry<T> | TAbstractResourceAsyncRegistry<T>, filterFn: (pack: TRegistryPack<T>) => boolean): Observable<T> =>
  reg.added$.pipe(
    filter(filterFn),
    take(1),
    map((pack: TRegistryPack<T>): T => pack.value)
  );

export const subscribeToEntityValue$ = <T extends TRegistrable | TMultitonRegistrable>(
  reg: TAbstractEntityRegistry<T> | TAbstractAsyncEntityRegistry<T>,
  filterFn: (pack: TRegistryPack<T>) => boolean
): Observable<T> =>
  reg.added$.pipe(
    filter(filterFn),
    take(1),
    map((pack: TRegistryPack<T>): T => pack.value)
  );
