import type { IFactory, ICameraParams } from '@Engine/Models';
import type { ICameraWrapper } from '@Engine/Wrappers';
import type { Camera } from 'three';
import type { ICameraConfig } from '@Engine/Launcher/Models';

export type ICameraFactory = IFactory<ICameraWrapper, Camera, ICameraParams, ICameraConfig>;
