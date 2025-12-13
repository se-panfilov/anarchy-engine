import type { TAnyCameraConfig } from '@/Engine/Camera';

export type TShadowCameraConfig = Omit<TAnyCameraConfig, 'audioListener' | 'position' | 'rotation' | 'name' | 'isActive'>;
export type TShadowPerspectiveCameraConfig = Omit<TShadowCameraConfig, 'position' | 'rotation' | 'name' | 'isActive'>;
export type TShadowOrthographicCameraConfig = Omit<TShadowCameraConfig, 'position' | 'rotation' | 'name' | 'isActive'>;
