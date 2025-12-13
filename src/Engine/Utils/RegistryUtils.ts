import type { IAbstractEntityRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { LookUpStrategy } from '@/Engine/Abstract/Registry';
import type { IRegistrable, IWithActive } from '@/Engine/Mixins';

export const getAll = <T>(registry: ReadonlyMap<string, T>): ReadonlyArray<T> => Array.from(registry.values());

export function getAllEntitiesWithTags<T extends IRegistrable>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, strategy: LookUpStrategy): ReadonlyArray<T> {
  if (tagList.length === 0) return [];
  return Array.from(registry.values()).filter((obj: T) => tagList[strategy]((tag: string) => obj.hasTag(tag)));
}

export function getAllEntitiesWithTag<T extends IRegistrable>(tag: string, registry: ReadonlyMap<string, T>): ReadonlyArray<T> {
  return Array.from(registry.values()).filter((obj: T) => obj.hasTag(tag));
}

export function getUniqEntityWithTags<T extends IRegistrable>(tagList: ReadonlyArray<string>, registry: ReadonlyMap<string, T>, strategy: LookUpStrategy): T | undefined {
  return Array.from(registry.values()).find((obj: T) => tagList[strategy]((tag: string) => obj.hasTag(tag)));
}

export function getUniqEntityWithTag<T extends IRegistrable>(tag: string, registry: ReadonlyMap<string, T>): T | undefined {
  return Array.from(registry.values()).find((obj: T) => obj.hasTag(tag));
}

export function setActiveWrappedEntity<E extends IRegistrable, AE extends IWithActive<E>>(registry: IProtectedRegistry<IAbstractEntityRegistry<AE>>, id: string): void {
  registry.forEach((entity: AE): void => {
    const isTarget: boolean = entity.id === id;
    if (isTarget) entity._setActive(true, true);
    else entity._setActive(false, true);
  });
}

export const findActiveWrappedEntity = <E extends IRegistrable, AE extends IWithActive<E>>(registry: IProtectedRegistry<IAbstractEntityRegistry<AE>>): AE | undefined =>
  registry.find((entity: AE): boolean => entity.isActive);
