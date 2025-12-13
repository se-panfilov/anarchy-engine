import type { IAbstractRegistry } from '@/Engine/Abstract';
import { AbstractRegistry } from '@/Engine/Abstract';
import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractAsyncRegistry } from '@/Engine/Abstract/Models';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';

import { subscribeToValue } from './AbstractAsyncRegistryHelper';

export function AbstractAsyncRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractAsyncRegistry<T> {
  const abstractRegistry: IAbstractRegistry<T> = AbstractRegistry<T>(type);

  function getUniqWithSomeTagAsync(tags: ReadonlyArray<string>): Promise<T> {
    const result: T | undefined = abstractRegistry.getUniqWithSomeTag(tags);
    if (isDefined(result)) return Promise.resolve(result);
    const { promise } = subscribeToValue<T>(abstractRegistry, (entity: T) => entity.getTags().some((tag: string) => tags.includes(tag)));
    return promise;
  }

  function getUniqWithEveryTagAsync(tags: ReadonlyArray<string>): Promise<T> {
    const result: T | undefined = abstractRegistry.getUniqWithEveryTag(tags);
    if (isDefined(result)) return Promise.resolve(result);
    const { promise } = subscribeToValue<T>(abstractRegistry, (entity: T) => entity.getTags().every((tag: string) => tags.includes(tag)));
    return promise;
  }

  function getUniqByTagAsync(tag: string): Promise<T> {
    const result: T | undefined = abstractRegistry.getUniqWithSomeTag([tag]);
    if (isDefined(result)) return Promise.resolve(result);
    const { promise } = subscribeToValue<T>(abstractRegistry, (entity: T) => entity.hasTag(tag));
    return promise;
  }

  return {
    ...abstractRegistry,
    getUniqWithSomeTagAsync,
    getUniqWithEveryTagAsync,
    getUniqByTagAsync
  };
}
