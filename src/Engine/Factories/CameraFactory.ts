import type { CameraParams, Factory } from '@Engine/Models';
import { CameraWrapper } from '@Engine/Wrappers';
import type { ICameraWrapper } from '@Engine/Wrappers';
import { AbstractFactory } from './AbstractFactory';
import type { CreateFN } from './AbstractFactory';
import { cameraAdapter } from '@Engine/Adapters';
import { Camera } from 'three';

const create: CreateFN<ReturnType<typeof CameraWrapper>, CameraParams> = (
  params: CameraParams
): ReturnType<typeof CameraWrapper> => CameraWrapper(params);

export const CameraFactory = (): Factory<ICameraWrapper, Camera, CameraParams> =>
  AbstractFactory('camera', create, cameraAdapter);
