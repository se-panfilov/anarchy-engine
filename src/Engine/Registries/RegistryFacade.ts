import type { IAbstractRegistry, IProtectedRegistry, IReactiveWrapper } from '@Engine/Models';

export function RegistryFacade<T extends IReactiveWrapper<unknown>, R extends IAbstractRegistry<T>>(
  abstractRegistry: R
): IProtectedRegistry<T, R> {
  const { registry, ...rest } = abstractRegistry;
  return rest;
}
