import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { TColor } from '@hellpig/anarchy-engine/Color';
import type { TWithMaterial } from '@hellpig/anarchy-engine/Material';
import type { TWithObject3d } from '@hellpig/anarchy-engine/Mixins';
import type { TPoints } from '@hellpig/anarchy-engine/ThreeLib';
import type { TWithTransformDrive } from '@hellpig/anarchy-engine/TransformDrive';

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
