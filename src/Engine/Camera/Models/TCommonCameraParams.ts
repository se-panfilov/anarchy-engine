import type { AudioListener, Vector3 } from 'three';

import type { CameraType } from '@/Engine/Camera/Constants';
import type { TActive, TWithName, TWithTags } from '@/Engine/Mixins';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@/Engine/TransformDrive';

export type TCommonCameraParams = Readonly<{
  audioListener?: AudioListener;
  far?: number;
  lookAt?: Vector3;
  near?: number;
  type: CameraType;
  up?: Vector3;
  zoom?: number;
}> &
  TWithTransformAgentParam &
  TWithName &
  TActive &
  TObject3DParams &
  TWithTags;
