import type { TKinematicData } from './TKinematicData';
import type { TKinematicConfigState } from './TKinematicState';
import type { TKinematicConfigTarget } from './TKinematicTarget';

export type TKinematicDataConfig = Omit<TKinematicData, 'state' | 'target'> &
  Readonly<{
    state: TKinematicConfigState;
    target?: TKinematicConfigTarget;
  }>;
