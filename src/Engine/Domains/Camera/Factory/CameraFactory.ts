import { ambientContext } from '@Engine/Context';
import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory, destroyableFactoryMixin, withConfigMixin } from '@Engine/Domains/Abstract';

import { fromConfig } from '../Adapter';
import type { ICameraFactory, ICameraParams, ICameraWrapper } from '../Models';
import { CameraWrapper } from '../Wrapper';

const create = (params: ICameraParams): ICameraWrapper => CameraWrapper(params, ambientContext.screenSizeWatcher);
const factory: IFactory<ICameraWrapper, ICameraParams> = { ...AbstractFactory('camera'), create };
export const CameraFactory = (): ICameraFactory => ({ ...factory, ...withConfigMixin(fromConfig), ...destroyableFactoryMixin(factory) });
