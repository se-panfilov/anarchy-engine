import type { IParamsFromConfig, TReactiveFactory } from '@/Engine/Abstract';
import type { TDestroyable } from '@/Engine/Mixins';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraParams } from './ICameraParams';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraFactory = TReactiveFactory<ICameraWrapper, ICameraParams> & IParamsFromConfig<ICameraConfig, ICameraParams> & TDestroyable;
