import type { IAbstractRegistry, IProtectedRegistry, IWrapper } from '@Engine/Models';

export function RegistryFacade<T extends IWrapper<unknown>, R extends IAbstractRegistry<T>>(
  abstractRegistry: R
): IProtectedRegistry<T, R> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { registry, ...rest } = abstractRegistry;
  return rest;
}
