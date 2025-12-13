import type { IReactiveFactory, IParamsFromConfig } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraParams } from './ICameraParams';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraFactory = IReactiveFactory<ICameraWrapper, ICameraParams> & IParamsFromConfig<ICameraConfig, ICameraParams> & IDestroyable;
