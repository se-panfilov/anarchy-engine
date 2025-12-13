import type { CameraType, TAnyCameraConfig } from '@Anarchy/Engine/Camera';

export type TShadowCameraConfig = Omit<TAnyCameraConfig, 'audioListener' | 'position' | 'rotation' | 'name' | 'isActive' | 'type'> &
  Readonly<{
    type?: CameraType;
  }>;
export type TShadowPerspectiveCameraConfig = Omit<TShadowCameraConfig, 'position' | 'rotation' | 'name' | 'isActive' | 'type'> &
  Readonly<{
    type?: CameraType;
  }>;
export type TShadowOrthographicCameraConfig = Omit<TShadowCameraConfig, 'position' | 'rotation' | 'name' | 'isActive' | 'type'> &
  Readonly<{
    type?: CameraType;
  }>;
