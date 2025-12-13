import type { Factory, CameraParams } from '@Engine/Models';
import type { ICameraWrapper } from '@Engine/Wrappers';
import type { Camera } from 'three';
import type { CameraConfig } from '@Engine/Launcher/Models';

export type ICameraFactory = Factory<ICameraWrapper, Camera, CameraParams, CameraConfig>;
