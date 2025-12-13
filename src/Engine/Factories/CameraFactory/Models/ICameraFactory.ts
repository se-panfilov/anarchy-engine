import type { ICameraConfig, ICameraParams, IFactory } from '@Engine/Models';
import type { ICameraWrapper } from '@Engine/Wrappers';
import type { Camera } from 'three';

export type ICameraFactory = IFactory<ICameraWrapper, Camera, ICameraParams, ICameraConfig>;
