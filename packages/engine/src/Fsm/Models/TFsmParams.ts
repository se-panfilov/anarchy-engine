import type { FsmEventsStrategy, FsmType } from '@/Fsm/Constants';
import type { TWithName, TWithTags } from '@/Mixins';

import type { TFsmEvents } from './TFsmEvents';
import type { TFsmStates } from './TFsmStates';

export type TFsmParams = Readonly<{
  type: FsmType | string;
  initial: TFsmStates;
  currentState?: TFsmStates;
  strategy?: FsmEventsStrategy;
  transitions: ReadonlyArray<readonly [TFsmStates, TFsmEvents, TFsmStates]>;
}> &
  TWithName &
  TWithTags;
