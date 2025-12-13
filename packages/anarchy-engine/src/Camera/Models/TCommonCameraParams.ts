import type { CameraType } from '@Anarchy/Engine/Camera/Constants';
import type { TActive, TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TObject3DParams } from '@Anarchy/Engine/ThreeLib';
import type { TWithTransformAgentParam } from '@Anarchy/Engine/TransformDrive';
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
