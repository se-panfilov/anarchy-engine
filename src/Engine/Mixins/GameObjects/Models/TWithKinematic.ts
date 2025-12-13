import type { TKinematicInfo } from '@/Engine/Physics/Models';

export type TWithKinematic = {
  kinematic: TKinematicInfo & TKinematicAccessors;
  setKinematicInfo: (kinematic: TKinematicInfo) => void;
  getKinematicInfo: () => TKinematicInfo;
  doKinematicMove: (delta: number) => void;
  doKinematicRotation: (delta: number) => void;
};

export type TKinematicAccessors = Readonly<{
  getSpeed: () => number;
  getAzimuth: () => number;
  getElevation: () => number;
  setLinearVelocity: (speed: number, azimuth: number, elevation: number) => void;
}>;
