import type { IAbstractConfig } from '@Engine/Launcher/Models';
import type { IDestroyableFactory, IFactory, IProtectedRegistry, IWrapper } from '@Engine/Models';
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

export function addToRegistry<E, W extends IWrapper<E>, C extends IAbstractConfig>(
  configList: ReadonlyArray<C>,
  // eslint-disable-next-line functional/prefer-immutable-types
  factory: IFactory<W, E, never, C> | IDestroyableFactory<W, E, never, C>,
  registry: IProtectedRegistry<W>
): void {
  if (isDestroyedFactory(factory)) throw new Error('Cannot add to registry: a factory is already destroyed');
  configList.forEach((config: C): void => registry.add((factory as IFactory<W, E, never, C>).fromConfig(config)));
}
