import type { TKinematicData } from './TKinematicData';

export type TWithKinematic = {
  kinematic: TKinematicData;
  setKinematicData: (kinematic: TKinematicData) => void;
  getKinematicData: () => TKinematicData;
  doKinematicMove: (delta: number) => void;
  doKinematicRotation: (delta: number) => void;
  isKinematicAutoUpdate: boolean;
  getSpeed: () => number;
  setSpeed: (speed: number, azimuth: number) => void;
  getAzimuth: () => number;
  setAzimuth: (azimuth: number) => void;
  getElevation: () => number;
  setElevation: (elevation: number) => void;
  setLinearVelocity: (speed: number, azimuth: number, elevation: number) => void;
};
