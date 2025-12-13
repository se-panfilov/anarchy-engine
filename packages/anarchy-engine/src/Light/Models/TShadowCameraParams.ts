import type { CameraType, TAnyCameraParams, TOrthographicCameraParams, TPerspectiveCameraParams } from '@Anarchy/Engine/Camera';

export type TShadowCameraParams = Omit<TAnyCameraParams, 'audioListener' | 'position' | 'rotation' | 'name' | 'isActive' | 'type'> &
  Readonly<{
    type?: CameraType;
  }>;
export type TShadowPerspectiveCameraParams = Omit<TPerspectiveCameraParams, 'position' | 'rotation' | 'name' | 'isActive' | 'type'> &
  Readonly<{
    type?: CameraType;
  }>;
export type TShadowOrthographicCameraParams = Omit<TOrthographicCameraParams, 'position' | 'rotation' | 'name' | 'isActive' | 'type'> &
  Readonly<{
    type?: CameraType;
  }>;
