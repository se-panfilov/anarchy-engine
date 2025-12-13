export type TVector3OrEuler = Readonly<{
  x: number;
  y: number;
  z: number;
  equals: (v: any) => boolean;
  clone: () => TVector3OrEuler;
}>;
