import type { IAbstractFactory, IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Abstract';
import type { Camera } from 'three';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraParams } from './ICameraParams';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraFactory = IAbstractFromConfigWrapperFactory<ICameraWrapper, Camera, ICameraParams, ICameraConfig, IAbstractFactory<ICameraWrapper, ICameraParams>>;
