import type { TWithName } from '@/Engine/Mixins';

import type { TFsmEvents } from './TFsmEvents';
import type { TFsmStates } from './TFsmStates';

export type TFsmParams = Readonly<{
  initial: TFsmStates;
  transitions: ReadonlyArray<Readonly<[TFsmStates, TFsmEvents, TFsmStates]>>;
}> &
  TWithName;
