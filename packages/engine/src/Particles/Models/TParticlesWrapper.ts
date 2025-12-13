import type { TWrapper } from '@/Abstract';
import type { TColor } from '@/Color';
import type { TWithMaterial } from '@/Material';
import type { TWithObject3d } from '@/Mixins';
import type { TPoints } from '@/ThreeLib';
import type { TWithTransformDrive } from '@/TransformDrive';

import type { TParticlesTransformAgents } from './TParticlesTransformAgents';

export type TParticlesWrapper = TWrapper<TPoints> &
  TWithTransformDrive<TParticlesTransformAgents> &
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
