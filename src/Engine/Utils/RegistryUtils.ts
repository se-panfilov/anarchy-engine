import type { IAbstractRegistry, IFactory, IFromConfig } from '@Engine/Domains/Abstract';
import type { IProtectedRegistry, IRegistrable } from '@Engine/Domains/Mixins';
import { isDestroyedFactory } from '@Engine/Utils/DestroyableUtils';

export function getAllEntitiesWithEveryTag<T extends { tags: ReadonlyArray<string> }>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  return getEntitiesWithTag(tagList, registry, true);
}

export function getAllEntitiesWithSomeTag<T extends { tags: ReadonlyArray<string> }>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  return getEntitiesWithTag(tagList, registry, false);
}

function getEntitiesWithTag<T extends { tags: ReadonlyArray<string> }>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, shouldMatchAllTags: boolean): ReadonlyArray<T> {
  if (tagList.length === 0) return [];
  const methodName: 'every' | 'some' = shouldMatchAllTags ? 'every' : 'some';

  return Array.from(registry.values()).filter((obj: T) => tagList[methodName]((tag: string) => obj.tags.includes(tag)));
}

export function addFromConfigToRegistry<T extends IRegistrable, C extends Record<string, any>>(
  configList: ReadonlyArray<C>,
  factory: IFactory & IFromConfig<T, C>,
  registry: IProtectedRegistry<T, IAbstractRegistry<any>>
): void {
  if (isDestroyedFactory(factory)) throw new Error('Cannot add to registry: a factory is already destroyed');
  if (!factory.fromConfig) throw new Error(`Factory "${factory.id}" of type "${factory.type}" doesn't meant to create entities from configs`);
  configList.forEach((config: C): void => registry.add(factory.fromConfig(config)));
}
