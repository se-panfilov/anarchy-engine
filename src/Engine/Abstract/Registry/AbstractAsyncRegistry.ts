import type { IAbstractRegistry, LookUpStrategy } from '@/Engine/Abstract';
import { AbstractRegistry } from '@/Engine/Abstract';
import type { RegistryType } from '@/Engine/Abstract/Constants';
import type { IAbstractAsyncRegistry } from '@/Engine/Abstract/Models';
import type { IMultitonRegistrable, IRegistrable } from '@/Engine/Mixins';
import { isDefined } from '@/Engine/Utils';

import { subscribeToValue } from './AbstractAsyncRegistryHelper';

export function AbstractAsyncRegistry<T extends IRegistrable | IMultitonRegistrable>(type: RegistryType): IAbstractAsyncRegistry<T> {
  const abstractRegistry: IAbstractRegistry<T> = AbstractRegistry<T>(type);

  // TODO (S.Panfilov) add stop the subscription function as param

  function getUniqByTagsAsync(tags: ReadonlyArray<string>, strategy: LookUpStrategy): Promise<T> {
    const result: T | undefined = abstractRegistry.getUniqByTags(tags, strategy);
    if (isDefined(result)) return Promise.resolve(result);
    const { promise } = subscribeToValue<T>(abstractRegistry, (entity: T) => entity.getTags()[strategy]((tag: string) => tags.includes(tag)));
    return promise;
  }

  function getUniqByTagAsync(tag: string): Promise<T> {
    const result: T | undefined = abstractRegistry.getUniqByTag(tag);
    if (isDefined(result)) return Promise.resolve(result);
    const { promise } = subscribeToValue<T>(abstractRegistry, (entity: T) => entity.hasTag(tag));
    return promise;
  }

  return {
    ...abstractRegistry,
    getUniqByTagsAsync,
    getUniqByTagAsync
  };
}
