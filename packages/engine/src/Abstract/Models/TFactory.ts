import type { FactoryType } from '@/Abstract/Constants';
import type { TNoSpread, TWithId } from '@/Mixins';

import type { TCreateEntityFactoryFn } from './TCreateEntityFactoryFn';

export type TFactory<T, P, D = Record<string, any> | undefined> = Readonly<{
  create: TCreateEntityFactoryFn<T, P, D>;
  type: FactoryType | string;
}> &
  TWithId &
  TNoSpread;
