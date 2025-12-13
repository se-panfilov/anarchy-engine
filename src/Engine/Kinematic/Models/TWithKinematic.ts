import type { Vector3 } from 'three';

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
  setKinematicLinearVelocityFromParams: (speed: number, azimuth: number, elevation: number) => void;
  setKinematicLinearVelocity: (linearVelocity: Vector3) => void;
  setKinematicAngularVelocity: (angularVelocity: Vector3) => void;
  setKinematicPrincipalInertia: (principalInertia: Vector3) => void;
};
