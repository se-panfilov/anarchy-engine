import type { TKinematicInfo } from '@/Engine/Physics/Models';

export type TWithKinematic = {
  setKinematicInfo: (kinematic: TKinematicInfo) => void;
  getKinematicInfo: () => TKinematicInfo;
  kinematic: TKinematicInfo & TKinematicAccessors;
};

export type TKinematicAccessors = Readonly<{
  getSpeed: () => number;
  getAzimuth: () => number;
  getElevation: () => number;
}>;
