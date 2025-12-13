import type { TKinematicFields } from './TKinematicFields';

export type TWithKinematic = {
  kinematic: TKinematicFields;
  doKinematicMove: (delta: number) => void;
  doKinematicRotation: (delta: number) => void;
};
