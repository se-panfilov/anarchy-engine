import type { FactoryType } from '@/Engine/Domains/Abstract/Constants';

export type IFactory<T = any, P = any> = Readonly<{
  id: string;
  type: FactoryType | string;
  create: (params: P) => T;
}>;
