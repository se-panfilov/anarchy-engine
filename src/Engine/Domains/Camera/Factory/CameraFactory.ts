import { ambientContext } from '@Engine/Context';
import type { IReactiveFactory } from '@Engine/Domains/Abstract';
import { FactoryType, ReactiveFactory } from '@Engine/Domains/Abstract';

import { getParams } from '../Adapter';
import type { ICameraFactory, ICameraParams, ICameraWrapper } from '../Models';
import { CameraWrapper } from '../Wrapper';

const create = (params: ICameraParams): ICameraWrapper => CameraWrapper(params, ambientContext.screenSizeWatcher);
const factory: IReactiveFactory<ICameraWrapper, ICameraParams> = { ...ReactiveFactory(FactoryType.Camera, create) };
export const CameraFactory = (): ICameraFactory => ({ ...factory, getParams });
