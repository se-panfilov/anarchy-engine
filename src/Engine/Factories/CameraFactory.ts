import { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import type { Factory } from '@Engine/Models/Factory';
import type { CameraParams } from '@Engine/Models/CameraParams';

const create = (params: CameraParams): ReturnType<typeof CameraWrapper> => CameraWrapper(params);

export const CameraFactory = (): Factory<ReturnType<typeof CameraWrapper>, CameraParams> => AbstractFactory(create);
