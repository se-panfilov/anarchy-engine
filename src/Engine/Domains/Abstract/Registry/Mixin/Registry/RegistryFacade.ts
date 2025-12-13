import type { IAbstractRegistry } from '@Engine/Domains/Abstract';

import type { IProtectedRegistry, IRegistrable } from '../Models';

export function RegistryFacade<T extends IRegistrable>(abstractRegistry: IAbstractRegistry<T>): IProtectedRegistry<T, IAbstractRegistry<T>> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { registry, ...rest } = abstractRegistry;
  return rest;
}
