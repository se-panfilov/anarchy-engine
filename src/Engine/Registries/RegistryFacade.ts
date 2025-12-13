import type { IAbstractRegistry, IProtectedRegistry, IWrapper } from '@Engine/Models';

export function RegistryFacade<T extends IWrapper<unknown>>(
  abstractRegistry: IAbstractRegistry<T>
): IProtectedRegistry<T> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { registry, ...rest } = abstractRegistry;
  return rest;
}
