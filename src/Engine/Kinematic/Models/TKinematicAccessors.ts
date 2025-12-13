export type TKinematicAccessors = Readonly<{
  getSpeed: () => number;
  getAzimuth: () => number;
  getElevation: () => number;
  setLinearVelocity: (speed: number, azimuth: number, elevation: number) => void;
}>;
