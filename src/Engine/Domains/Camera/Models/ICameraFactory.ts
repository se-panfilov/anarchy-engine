import type { IAbstractFactory } from '@Engine/Domains/Abstract';
import type { IAbstractFromConfigWrapperFactory } from '@Engine/Domains/Mixins';
import type { Camera } from 'three';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraParams } from './ICameraParams';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraFactory = IAbstractFromConfigWrapperFactory<ICameraWrapper, Camera, ICameraParams, ICameraConfig, IAbstractFactory<ICameraWrapper, ICameraParams>>;
