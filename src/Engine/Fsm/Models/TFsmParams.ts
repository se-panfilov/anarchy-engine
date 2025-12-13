import type { FsmType } from '@/Engine/Fsm/Constants';
import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';

import type { TFsmEvents } from './TFsmEvents';
import type { TFsmStates } from './TFsmStates';

export type TFsmParams = Readonly<{
  type: FsmType | string;
  initial: TFsmStates;
  transitions: ReadonlyArray<readonly [TFsmStates, TFsmEvents, TFsmStates]>;
}> &
  TWithName &
  TWithReadonlyTags;
