import type { IParamsFromConfig, IReactiveFactory } from '@/Engine/Abstract';
import type { IDestroyable } from '@/Engine/Mixins';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraParams } from './ICameraParams';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraFactory = IReactiveFactory<ICameraWrapper, ICameraParams> & IParamsFromConfig<ICameraConfig, ICameraParams> & IDestroyable;
