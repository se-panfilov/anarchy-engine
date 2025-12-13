import type { IWrapper } from '@Engine/Models';

export type IAbstractWrapperFactory<T extends IWrapper<ENT>, ENT, PRMS> = Readonly<{
  id: string;
  type: string;
  create: (params: PRMS) => T;
}>;
