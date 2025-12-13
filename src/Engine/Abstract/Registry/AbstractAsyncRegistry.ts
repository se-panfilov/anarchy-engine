import type { IAbstractRegistry, IAsyncEntityGetter, LookUpStrategy } from '@/Engine/Abstract';
import { AbstractRegistry } from '@/Engine/Abstract';
import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractAsyncRegistry } from '@/Engine/Abstract/Models';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';

import { subscribeToValue } from './AbstractAsyncRegistryHelper';

export function AbstractAsyncRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractAsyncRegistry<T> {
  const abstractRegistry: IAbstractRegistry<T> = AbstractRegistry<T>(type);

  function getUniqByTagsAsync(tags: ReadonlyArray<string>, strategy: LookUpStrategy): IAsyncEntityGetter<T> {
    const result: T | undefined = abstractRegistry.getUniqByTags(tags, strategy);
    if (isDefined(result)) return { promise: Promise.resolve(result), stop: () => undefined };
    return subscribeToValue<T>(abstractRegistry, (entity: T) => entity.getTags()[strategy]((tag: string) => tags.includes(tag)));
  }

  function getUniqByTagAsync(tag: string): IAsyncEntityGetter<T> {
    const result: T | undefined = abstractRegistry.getUniqByTag(tag);
    if (isDefined(result)) return { promise: Promise.resolve(result), stop: () => undefined };
    return subscribeToValue<T>(abstractRegistry, (entity: T) => entity.hasTag(tag));
  }

  return {
    ...abstractRegistry,
    getUniqByTagsAsync,
    getUniqByTagAsync
  };
}
