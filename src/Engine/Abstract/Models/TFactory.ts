import type { FactoryType } from '@/Engine/Abstract/Constants';

export type TFactory<T = any, P = any> = Readonly<{
  id: string;
  create: (params: P, dependencies?: Record<string, any>) => T;
  type: FactoryType | string;
}>;
