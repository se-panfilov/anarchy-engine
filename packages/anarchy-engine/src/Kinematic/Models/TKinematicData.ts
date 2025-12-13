import type { TOptional, TWriteable } from '@Anarchy/Shared/Utils';

import type { TKinematicState } from './TKinematicState';
import type { TKinematicTarget } from './TKinematicTarget';

export type TKinematicData = Readonly<{
  state: TKinematicState;
  target?: TKinematicTarget;
}>;

export type TKinematicOptionalData = Readonly<{
  state: TOptional<TKinematicState>;
  target?: TOptional<TKinematicTarget>;
}>;

export type TKinematicWritableData = {
  state: TWriteable<TKinematicState>;
  target: TWriteable<TKinematicTarget>;
};
