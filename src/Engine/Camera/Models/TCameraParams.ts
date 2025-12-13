import type { Vector3 } from 'three/src/math/Vector3';

import type { TActive, TWithNameOptional, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

export type TCameraParams = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt?: Vector3;
}> &
  TWithTransformAgentParam &
  TWithNameOptional &
  TActive &
  TObject3DParams &
  TWithReadonlyTags;
