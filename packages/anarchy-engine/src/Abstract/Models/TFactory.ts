import type { FactoryType } from '@hellpig/anarchy-engine/Abstract/Constants';
import type { TNoSpread, TWithId } from '@hellpig/anarchy-engine/Mixins';

import type { TCreateEntityFactoryFn } from './TCreateEntityFactoryFn';

export type TFactory<T, P, D = Record<string, any> | undefined, S extends Record<string, any> | undefined = undefined, F extends Record<string, boolean> | undefined = undefined> = Readonly<{
  create: TCreateEntityFactoryFn<T, P, D, S, F>;
  type: FactoryType | string;
}> &
  TWithId &
  TNoSpread;
