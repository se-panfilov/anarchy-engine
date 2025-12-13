import type { Vector3 } from 'three';

import type { TKinematicData } from './TKinematicData';

export type TKinematicMethods = Readonly<{
  setData: (kinematic: TKinematicData) => void;
  getData: () => TKinematicData;
  adjustDataByLinearVelocity: (linearVelocity: Vector3) => void;
  adjustDataFromAngularVelocity: (angularVelocity: Vector3) => void;
  isAutoUpdate: boolean;
  getLinearSpeed: () => number;
  setLinearSpeed: (speed: number) => void;
  getLinearDirection: () => Vector3;
  setLinearDirection: (direction: Vector3) => void;
  setLinearDirectionFromParams: (azimuth: number, elevation: number) => void;
  getLinearAzimuth: () => number;
  setLinearAzimuth: (azimuth: number) => void;
  getLinearElevation: () => number;
  setLinearElevation: (elevation: number) => void;
  getAngularSpeed: () => number;
  setAngularSpeed: (speed: number) => void;
  getAngularDirection: () => Vector3;
  setAngularDirection: (direction: Vector3) => void;
  setAngularDirectionFromParams: (azimuth: number, elevation: number) => void;
  getAngularAzimuth: () => number;
  setAngularAzimuth: (azimuth: number) => void;
  getAngularElevation: () => number;
  setAngularElevation: (elevation: number) => void;
  setAngularVelocityFromParams: (speed: number, azimuth: number, elevation: number) => void;
}>;
