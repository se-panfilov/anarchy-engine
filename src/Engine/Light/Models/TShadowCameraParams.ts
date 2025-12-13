import type { TAnyCameraParams, TOrthographicCameraParams, TPerspectiveCameraParams } from '@/Engine/Camera';

export type TShadowCameraParams = Omit<TAnyCameraParams, 'audioListener' | 'position' | 'rotation' | 'name' | 'isActive'>;
export type TShadowPerspectiveCameraParams = Omit<TPerspectiveCameraParams, 'position' | 'rotation' | 'name' | 'isActive'>;
export type TShadowOrthographicCameraParams = Omit<TOrthographicCameraParams, 'position' | 'rotation' | 'name' | 'isActive'>;
