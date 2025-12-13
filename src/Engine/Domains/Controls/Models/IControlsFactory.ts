import type { IFactory, IParamsFromConfig } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { IControlsConfig } from './IControlsConfig';
import type { IControlsParams } from './IControlsParams';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsFactory = IFactory<IControlsWrapper, IControlsParams> & IParamsFromConfig<IControlsConfig, IControlsParams> & IDestroyable;
