import type { TWrapper } from '@/Engine/Abstract';
import type { TColor } from '@/Engine/Color';
import type { IWithMaterial } from '@/Engine/Material';
import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';
import type { IWithTextures } from '@/Engine/Texture';
import type { IPoints } from '@/Engine/ThreeLib';

export type IParticlesWrapperAsync = TWrapper<IPoints> &
  IMovable3dXYZ &
  IRotatable &
  IScalable &
  IWithObject3d &
  IWithMaterial &
  IWithTextures &
  IWithTagsMixin &
  Readonly<{
    setMaterialColor: (colors: TColor) => void;
    getMaterialColor: () => TColor;
    setIndividualMaterialColors: (colors: Float32Array) => void;
    getIndividualMaterialColors: () => Float32Array;
    setIndividualPositions: (positions: Float32Array) => void;
    getIndividualPositions: () => Float32Array;
  }>;
