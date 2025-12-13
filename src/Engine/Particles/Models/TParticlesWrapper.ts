import type { TWrapper } from '@/Engine/Abstract';
import type { TColor } from '@/Engine/Color';
import type { TWithMaterial } from '@/Engine/Material';
import type { TMovable3dXYZ, TRotatable, TScaleMixin, TWithObject3d } from '@/Engine/Mixins';
import type { TPoints } from '@/Engine/ThreeLib';

export type TParticlesWrapper = TWrapper<TPoints> &
  TMovable3dXYZ &
  TRotatable &
  TScaleMixin &
  TWithObject3d &
  TWithMaterial &
  Readonly<{
    setMaterialColor: (colors: TColor) => void;
    getMaterialColor: () => TColor;
    setIndividualMaterialColors: (colors: Float32Array) => void;
    getIndividualMaterialColors: () => Float32Array;
    setIndividualPositions: (positions: Float32Array) => void;
    getIndividualPositions: () => Float32Array;
  }>;
