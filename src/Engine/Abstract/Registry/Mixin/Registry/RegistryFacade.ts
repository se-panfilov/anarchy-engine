import type { IAbstractAsyncRegistry, IAbstractRegistry, IProtectedAsyncRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IRegistrable } from '@/Engine/Mixins';
import { isAsyncRegistry } from '@/Engine/Utils';

export function RegistryFacade<T extends IRegistrable>(abstractRegistry: IAbstractRegistry<T>): IProtectedRegistry<T, IAbstractRegistry<T>> {
  if (isAsyncRegistry(abstractRegistry)) throw new Error('Cannot apply facade to a registry: async registry provided');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { registry, ...rest } = abstractRegistry;
  return rest;
}

export function RegistryAsyncFacade<T extends IRegistrable>(abstractAsyncRegistry: IAbstractAsyncRegistry<T>): IProtectedAsyncRegistry<T, IAbstractAsyncRegistry<T>> | never {
  if (!isAsyncRegistry(abstractAsyncRegistry)) throw new Error('Cannot apply async facade to a registry: not-async registry provided');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { registry, ...rest } = abstractAsyncRegistry;
  return rest;
}
