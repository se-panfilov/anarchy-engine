import { ambientContext } from '@Engine/Context';
import type { IFactory } from '@Engine/Domains/Abstract';
import { AbstractFactory } from '@Engine/Domains/Abstract';
import { destroyableMixin } from '@Engine/Domains/Mixins';

import { getParams } from '../Adapter';
import type { ICameraFactory, ICameraParams, ICameraWrapper } from '../Models';
import { CameraWrapper } from '../Wrapper';

const create = (params: ICameraParams): ICameraWrapper => CameraWrapper(params, ambientContext.screenSizeWatcher);
const factory: IFactory<ICameraWrapper, ICameraParams> = { ...AbstractFactory('camera'), create };
export const CameraFactory = (): ICameraFactory => ({ ...factory, getParams, ...destroyableMixin(factory) });
