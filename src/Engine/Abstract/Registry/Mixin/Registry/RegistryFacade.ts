import type { IAbstractAsyncRegistry, IAbstractRegistry, IProtectedRegistry } from '@/Engine/Abstract';
import type { IRegistrable } from '@/Engine/Mixins';
import { isAsyncRegistry } from '@/Engine/Utils';

export function RegistryFacade<T extends IRegistrable>(abstractRegistry: IAbstractRegistry<T>): IProtectedRegistry<T, IAbstractRegistry<T>> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { registry, ...rest } = abstractRegistry;
  return rest;
}

export function RegistryAsyncFacade<T extends IRegistrable>(abstractAsyncRegistry: IAbstractAsyncRegistry<T>): IProtectedRegistry<T, IAbstractAsyncRegistry<T>> | never {
  if (!isAsyncRegistry(abstractAsyncRegistry)) throw new Error('Not an async registry provided');
  return RegistryFacade(abstractAsyncRegistry) as IProtectedRegistry<T, IAbstractAsyncRegistry<T>>;
}
