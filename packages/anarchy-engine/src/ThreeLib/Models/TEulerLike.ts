export type TEulerLike = Readonly<{
  x: number;
  y: number;
  z: number;
  order?: 'XYZ' | 'XZY' | 'YXZ' | 'YZX' | 'ZXY' | 'ZYX';
}>;

export type TEulerString = Readonly<{
  _x: number;
  _y: number;
  _z: number;
  _order?: 'XYZ' | 'XZY' | 'YXZ' | 'YZX' | 'ZXY' | 'ZYX';
}>;
