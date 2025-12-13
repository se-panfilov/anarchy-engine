import type { TKinematicAccessors } from './TKinematicAccessors';
import type { TKinematicInfo } from './TKinematicInfo';

export type TWithKinematic = {
  kinematic: TKinematicInfo & TKinematicAccessors;
  setKinematicInfo: (kinematic: TKinematicInfo) => void;
  getKinematicInfo: () => TKinematicInfo;
  doKinematicMove: (delta: number) => void;
  doKinematicRotation: (delta: number) => void;
  isKinematicAutoUpdate: boolean;
};
