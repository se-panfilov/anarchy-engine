export type TPerspectiveCameraAccessors = Readonly<{
  setAspect: (aspect: number) => void;
  setFilmGauge: (filmGauge: number) => void;
  setFilmOffset: (filmOffset: number) => void;
  setFocus: (focus: number) => void;
  setFov: (fov: number) => void;
}>;
