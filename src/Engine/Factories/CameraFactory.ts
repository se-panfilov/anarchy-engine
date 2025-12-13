import { CameraWrapper } from '@Engine/Wrappers/CameraWrapper';
import { AbstractFactory } from '@Engine/Factories/AbstractFactory';
import type { CameraParams, Factory } from '@Engine/Models';

const create = (params: CameraParams): ReturnType<typeof CameraWrapper> => CameraWrapper(params);

export const CameraFactory = (): Factory<ReturnType<typeof CameraWrapper>, CameraParams> => AbstractFactory(create);
