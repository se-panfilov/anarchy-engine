import type { IAbstractFromConfigWrapperFactory } from '@Engine/Models';
import type { Camera } from 'three';
import type { ICameraConfig, ICameraParams, ICameraWrapper } from '@Engine/Domains/Camera/Models';

export type ICameraFactory = IAbstractFromConfigWrapperFactory<ICameraWrapper, Camera, ICameraParams, ICameraConfig>;
