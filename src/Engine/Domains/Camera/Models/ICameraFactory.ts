import type { ICameraConfig, ICameraParams, ICameraWrapper } from '@Engine/Domains/Camera/Models';
import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Models';
import type { Camera } from 'three';

export type ICameraFactory = IAbstractFromConfigWrapperFactory<ICameraWrapper, Camera, ICameraParams, ICameraConfig, IAbstractFactory<ICameraWrapper, ICameraParams>>;
