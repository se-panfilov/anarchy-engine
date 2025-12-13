import type { TVector4OrQuaternion } from './TVector4OrQuaternion';

export type TVector3OrEuler = Omit<TVector4OrQuaternion, 'w' | 'clone'> &
  Readonly<{
    clone: () => TVector3OrEuler;
  }>;
