import type { FsmEventsStrategy, FsmType } from '@hellpig/anarchy-engine/Fsm/Constants';
import type { TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';

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
