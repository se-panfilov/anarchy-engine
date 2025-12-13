import type { IWrapper } from '@/Engine/Abstract';
import type { IWithMaterial } from '@/Engine/Material';
import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';
import type { IWithTextures } from '@/Engine/Texture';
import type { IBufferGeometry } from '@/Engine/ThreeLib';

export type IParticlesWrapperAsync = IWrapper<IBufferGeometry> &
  IMovable3dXYZ &
  IRotatable &
  IScalable &
  IWithObject3d &
  IWithMaterial &
  IWithTextures &
  IWithTagsMixin &
  Readonly<{
    setIndividualColors: (colors: Float32Array) => void;
    getIndividualColors: () => Float32Array;
    setPositions: (positions: Float32Array) => void;
    getPositions: () => Float32Array;
  }>;
