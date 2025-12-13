import type { CameraParams, Factory } from '@Engine/Models';
import { CameraWrapper } from '@Engine/Wrappers';
import { AbstractFactory } from './AbstractFactory';
import { cameraAdapter } from '@Engine/Launcher/ConfigToParamAdapters';

const create = (params: CameraParams): ReturnType<typeof CameraWrapper> => CameraWrapper(params);

export const CameraFactory = (): Factory<ReturnType<typeof CameraWrapper>, CameraParams> =>
  AbstractFactory('camera', create, cameraAdapter);
