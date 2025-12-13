import type { IFactory, IParamsFromConfig, IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraParams } from './ICameraParams';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraFactory = IFactory<ICameraWrapper, ICameraParams> & IReactiveFactory<ICameraWrapper> & IParamsFromConfig<ICameraConfig, ICameraParams> & IDestroyable;
