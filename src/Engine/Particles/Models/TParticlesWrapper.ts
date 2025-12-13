import type { TWrapper } from '@/Engine/Abstract';
import type { TColor } from '@/Engine/Color';
import type { TWithMaterial } from '@/Engine/Material';
import type { TWithObject3d } from '@/Engine/Mixins';
import type { TPoints } from '@/Engine/ThreeLib';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

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
