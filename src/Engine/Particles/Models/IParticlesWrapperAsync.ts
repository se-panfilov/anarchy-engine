import type { IWrapper } from '@/Engine/Abstract';
import type { IColor } from '@/Engine/Color';
import type { IWithMaterial } from '@/Engine/Material';
import type { IMovable3dXYZ, IRotatable, IScalable, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';
import type { IWithTextures } from '@/Engine/Texture';
import type { IPoints } from '@/Engine/ThreeLib';

export type IParticlesWrapperAsync = IWrapper<IPoints> &
  IMovable3dXYZ &
  IRotatable &
  IScalable &
  IWithObject3d &
  IWithMaterial &
  IWithTextures &
  IWithTagsMixin &
  Readonly<{
    setMaterialColor: (colors: IColor) => void;
    getMaterialColor: () => IColor;
    setIndividualMaterialColors: (colors: Float32Array) => void;
    getIndividualMaterialColors: () => Float32Array;
    setPositions: (positions: Float32Array) => void;
    getPositions: () => Float32Array;
  }>;
