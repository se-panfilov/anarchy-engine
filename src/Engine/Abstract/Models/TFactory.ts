import type { FactoryType } from '@/Engine/Abstract/Constants';
import type { TNoSpread, TWithId } from '@/Engine/Mixins';

import type { TAbstractHooks } from './TAbstractHooks';
import type { TCreateEntityFactoryFn } from './TCreateEntityFactoryFn';

export type TFactory<T, P, D = Record<string, any>, H extends TAbstractHooks = undefined> = Readonly<{
  create: TCreateEntityFactoryFn<T, P, D, H>;
  type: FactoryType | string;
}> &
  TWithId &
  TNoSpread;
