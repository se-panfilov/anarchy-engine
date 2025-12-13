import type { TKinematicData } from './TKinematicData';

export type TWithKinematic = {
  kinematic: TKinematicData;
  setKinematicData: (kinematic: TKinematicData) => void;
  getKinematicData: () => TKinematicData;
  doKinematicMove: (delta: number) => void;
  doKinematicRotation: (delta: number) => void;
  isKinematicAutoUpdate: boolean;
  getKinematicSpeed: () => number;
  setKinematicSpeed: (speed: number) => void;
  getKinematicAzimuth: () => number;
  setKinematicAzimuth: (azimuth: number) => void;
  getKinematicElevation: () => number;
  setKinematicElevation: (elevation: number) => void;
  setKinematicLinearVelocity: (speed: number, azimuth: number, elevation: number) => void;
};
