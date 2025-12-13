import type { IReactiveFactory } from '@Engine/Domains/Abstract';

import type { IDestroyable } from '@/Engine/Domains/Mixins';

import type { IAdditionalControlsConfigParams } from './IAdditionalControlsConfigParams';
import type { IControlsConfig } from './IControlsConfig';
import type { IControlsParams } from './IControlsParams';
import type { IControlsWrapper } from './IControlsWrapper';

export type IControlsParamsFromConfig = Readonly<{
  getParams: (config: IControlsConfig, additionalParams: IAdditionalControlsConfigParams) => IControlsParams;
}>;

export type IControlsFactory = IReactiveFactory<IControlsWrapper, IControlsParams> & IControlsParamsFromConfig & IDestroyable;
