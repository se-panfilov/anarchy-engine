export type TVector4OrQuaternion = Readonly<{
  x: number;
  y: number;
  z: number;
  w: number;
  equals: (v: any) => boolean;
  clone: () => TVector4OrQuaternion;
}>;
