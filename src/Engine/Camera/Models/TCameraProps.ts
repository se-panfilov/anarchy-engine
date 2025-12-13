import type { Vector3 } from 'three/src/math/Vector3';

import type { TActive, TWithNameOptional } from '@/Engine/Mixins';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

export type TCameraProps = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt?: Vector3;
}> &
  TWithTransformAgentParam &
  TWithNameOptional &
  TActive;
