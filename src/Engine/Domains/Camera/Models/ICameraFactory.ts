import type { IFactory, IFromConfig } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { ICameraConfig } from './ICameraConfig';
import type { ICameraParams } from './ICameraParams';
import type { ICameraWrapper } from './ICameraWrapper';

export type ICameraFactory = IFactory<ICameraWrapper, ICameraParams> & IFromConfig<ICameraConfig, ICameraParams> & IDestroyable;
