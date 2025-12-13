import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';

import type { TFsmEvents } from './TFsmEvents';
import type { TFsmStates } from './TFsmStates';

export type TFsmParams = Readonly<{
  type: string;
  initial: TFsmStates;
  transitions: ReadonlyArray<Readonly<[TFsmStates, TFsmEvents, TFsmStates]>>;
}> &
  TWithName &
  TWithReadonlyTags;
