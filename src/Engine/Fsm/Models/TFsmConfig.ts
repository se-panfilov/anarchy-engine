import type { TFsmEvents } from './TFsmEvents';
import type { TFsmParams } from './TFsmParams';
import type { TFsmStates } from './TFsmStates';

export type TFsmConfig = Omit<TFsmParams, 'transitions'> &
  Readonly<{
    transitions: ReadonlyArray<ReadonlyArray<TFsmStates | TFsmEvents>>;
  }>;
