import type { FactoryType } from '@/Engine/Abstract/Constants';
import type { TNoSpread, TWithId } from '@/Engine/Mixins';

import type { TCreateEntityFactoryFn, TCreateEntityFactoryWithDependenciesFn } from './TCreateEntityFactoryFn';

export type TFactoryWithDependencies<T, P, D = Record<string, any>> = Omit<TFactory<T, P>, 'create'> &
  Readonly<{
    create: TCreateEntityFactoryWithDependenciesFn<T, P, D>;
  }>;

export type TFactory<T, P> = Readonly<{
  create: TCreateEntityFactoryFn<T, P>;
  type: FactoryType | string;
}> &
  TWithId &
  TNoSpread;
