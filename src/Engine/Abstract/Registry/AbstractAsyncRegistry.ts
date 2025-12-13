import type { Subscription } from 'rxjs';
import { filter } from 'rxjs';

import type { IAbstractRegistry } from '@/Engine/Abstract';
import { AbstractRegistry } from '@/Engine/Abstract';
import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractAsyncRegistry } from '@/Engine/Abstract/Models';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';

export function AbstractAsyncRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractAsyncRegistry<T> {
  const abstractRegistry: IAbstractRegistry<T> = AbstractRegistry<T>(type);

  function getUniqWithSomeTagAsync(tags: ReadonlyArray<string>): Promise<T> {
    const result: T | undefined = abstractRegistry.getUniqWithSomeTag(tags);
    if (isDefined(result)) return Promise.resolve(result);
    return new Promise((resolve: (entity: T) => void): void => {
      const subs$: Subscription = abstractRegistry.added$.pipe(filter((entity: T) => entity.getTags().some((tag: string) => tags.includes(tag)))).subscribe((entity: T): void => {
        resolve(entity);
        subs$.unsubscribe();
      });
    });
  }

  function getUniqWithEveryTagAsync(tags: ReadonlyArray<string>): Promise<T> {
    const result: T | undefined = abstractRegistry.getUniqWithEveryTag(tags);
    if (isDefined(result)) return Promise.resolve(result);
    return new Promise((resolve: (entity: T) => void): void => {
      const subs$: Subscription = abstractRegistry.added$.pipe(filter((entity: T) => entity.getTags().every((tag: string) => tags.includes(tag)))).subscribe((entity: T): void => {
        resolve(entity);
        subs$.unsubscribe();
      });
    });
  }

  function getUniqByTagAsync(tag: string): Promise<T> {
    const result: T | undefined = abstractRegistry.getUniqWithSomeTag([tag]);
    if (isDefined(result)) return Promise.resolve(result);
    return new Promise((resolve: (entity: T) => void): void => {
      const subs$: Subscription = abstractRegistry.added$.pipe(filter((entity: T) => entity.hasTag(tag))).subscribe((entity: T): void => {
        resolve(entity);
        subs$.unsubscribe();
      });
    });
  }

  return {
    ...abstractRegistry,
    getUniqWithSomeTagAsync,
    getUniqWithEveryTagAsync,
    getUniqByTagAsync
  };
}
