import type { TWrapper } from '@/Engine/Abstract';
import type { TColor } from '@/Engine/Color';
import type { TWithMaterial } from '@/Engine/Material';
import type { IScalable, TMovable3dXYZ, TRotatable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { IWithTextures } from '@/Engine/Texture';
import type { IPoints } from '@/Engine/ThreeLib';

export type TParticlesWrapperAsync = TWrapper<IPoints> &
  TMovable3dXYZ &
  TRotatable &
  IScalable &
  TWithObject3d &
  TWithMaterial &
  IWithTextures &
  TWithTagsMixin &
  Readonly<{
    setMaterialColor: (colors: TColor) => void;
    getMaterialColor: () => TColor;
    setIndividualMaterialColors: (colors: Float32Array) => void;
    getIndividualMaterialColors: () => Float32Array;
    setIndividualPositions: (positions: Float32Array) => void;
    getIndividualPositions: () => Float32Array;
  }>;
