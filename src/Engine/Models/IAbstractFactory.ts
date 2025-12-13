import type { IWrapper } from '@Engine/Models';

export type IAbstractFactory<T extends IWrapper<ENT>, ENT, PRMS> = Readonly<{
  id: string;
  type: string;
  create: (params: PRMS) => T;
}>;
