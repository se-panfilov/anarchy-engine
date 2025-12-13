import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { TColor } from '@Anarchy/Engine/Color';
import type { TWithMaterial } from '@Anarchy/Engine/Material';
import type { TWithObject3d } from '@Anarchy/Engine/Mixins';
import type { TPoints } from '@Anarchy/Engine/ThreeLib';
import type { TWithTransformDrive } from '@Anarchy/Engine/TransformDrive';

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
