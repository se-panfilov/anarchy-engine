import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { ICameraConfig, ICameraParams, ICameraWrapper } from '@Engine/Domains/Camera';
import type { Camera } from 'three';

export type ICameraFactory = IAbstractFromConfigWrapperFactory<ICameraWrapper, Camera, ICameraParams, ICameraConfig, IAbstractFactory<ICameraWrapper, ICameraParams>>;
