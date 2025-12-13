import type { IAbstractRegistry, IProtectedRegistry, IWrapper } from '@Engine/Models';

export function RegistryFacade<T extends IWrapper<unknown>, R extends IAbstractRegistry<T>>(
  abstractRegistry: R
): IProtectedRegistry<T, R> {
  const { registry, ...rest } = abstractRegistry;
  return rest;
}
