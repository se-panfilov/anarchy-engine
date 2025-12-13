import type { IAbstractRegistry, IProtectedRegistry, IRegistrableEntity } from '@Engine/Models';

export function RegistryFacade<T extends IRegistrableEntity>(abstractRegistry: IAbstractRegistry<T>): IProtectedRegistry<T> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { registry, ...rest } = abstractRegistry;
  return rest;
}
