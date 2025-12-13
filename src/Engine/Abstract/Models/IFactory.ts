import type { FactoryType } from '@/Engine/Abstract/Constants';

export type IFactory<T = any, P = any> = Readonly<{
  id: string;
  type: FactoryType | string;
  create: (params: P, dependencies?: Record<string, any>) => T;
}>;
