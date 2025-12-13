import type { FactoryType } from '@Engine/Abstract/Constants';
import type { TNoSpread, TWithId } from '@Engine/Mixins';

import type { TCreateEntityFactoryFn } from './TCreateEntityFactoryFn';

export type TFactory<T, P, D = Record<string, any> | undefined, O extends Record<string, any> | undefined = undefined> = Readonly<{
  create: TCreateEntityFactoryFn<T, P, D, O>;
  type: FactoryType | string;
}> &
  TWithId &
  TNoSpread;
