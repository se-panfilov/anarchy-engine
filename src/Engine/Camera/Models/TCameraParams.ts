import type { AudioListener, Vector3 } from 'three';

import type { TActive, TWithName, TWithTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

export type TCameraParams = Readonly<{
  fov?: number;
  near?: number;
  far?: number;
  lookAt?: Vector3;
  filmGauge?: number;
  filmOffset?: number;
  focus?: number;
  zoom?: number;
  audioListener?: AudioListener;
}> &
  TWithTransformAgentParam &
  TWithName &
  TActive &
  TObject3DParams &
  TWithTags;
