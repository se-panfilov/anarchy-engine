import type { ICameraConfig, ICameraParams, IAbstractFromConfigFactory } from '@Engine/Models';
import type { ICameraWrapper } from '@Engine/Wrappers';
import type { Camera } from 'three';

export type ICameraFactory = IAbstractFromConfigFactory<ICameraWrapper, Camera, ICameraParams, ICameraConfig>;
