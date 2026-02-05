import type { CameraType } from '@hellpig/anarchy-engine/Camera/Constants';
import type { TActive, TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { TObject3DParams } from '@hellpig/anarchy-engine/ThreeLib';
import type { TWithTransformAgentParam } from '@hellpig/anarchy-engine/TransformDrive';
import type { AudioListener, Vector3 } from 'three';

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
