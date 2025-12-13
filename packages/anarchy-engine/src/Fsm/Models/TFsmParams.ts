import type { FsmEventsStrategy, FsmType } from '@Anarchy/Engine/Fsm/Constants';
import type { TWithName, TWithTags } from '@Anarchy/Engine/Mixins';

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
