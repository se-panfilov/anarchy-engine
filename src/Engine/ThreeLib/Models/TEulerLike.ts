// TODO 8.0.0. MODELS: This is a temporary solution. Remove it after replace all rotations with Quaternions
export type TEulerLike = Readonly<{
  x: number;
  y: number;
  z: number;
  order?: 'XYZ' | 'XZY' | 'YXZ' | 'YZX' | 'ZXY' | 'ZYX';
}>;
